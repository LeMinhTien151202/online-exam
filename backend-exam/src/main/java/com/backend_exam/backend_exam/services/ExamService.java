package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.ExamDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Category;
import com.backend_exam.backend_exam.models.Exam;
import com.backend_exam.backend_exam.models.Level;
import com.backend_exam.backend_exam.repositories.CategoryRepository;
import com.backend_exam.backend_exam.repositories.ExamRepository;
import com.backend_exam.backend_exam.repositories.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExamService implements IExamService{
    private final CategoryRepository categoryRepository;
    private final LevelRepository levelRepository;
    private final ExamRepository examRepository;

    @Value("${app.upload-dir}")
    private String uploadDir;

    @Override
    public List<Exam> getAllExam() {
        return examRepository.findAll();
    }

    @Override
    public Exam getByIdExam(Long id) {
        return examRepository.findById(id).orElseThrow(() -> new RuntimeException("exam not found"));
    }

    @Override
    public Exam createExam(ExamDTO examDTO) throws DataNotFoundException {
        Category category = categoryRepository.findById(examDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find category with id: " + examDTO.getCategoryId()));

        Level level = levelRepository.findById(examDTO.getLevelId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find level with id: " + examDTO.getLevelId()));

        Exam newExam = Exam.builder()
                .examName(examDTO.getExamName())
                .category(category)
                .level(level)
                .build();

        return examRepository.save(newExam);
    }

    @Transactional
    @Override
    public Exam saveExamWithThumbnail(Exam exam, MultipartFile thumbnailFile) throws IOException {

        // Xử lý upload file ảnh nếu có
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            // Tạo thư mục uploads nếu chưa tồn tại
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            // Xóa file ảnh cũ nếu tồn tại
            if (exam.getPictures() != null && !exam.getPictures().isEmpty()) {
                File oldFile = new File(exam.getPictures().substring(1)); // Bỏ dấu "/" đầu tiên
                if (oldFile.exists()) {
                    oldFile.delete();
                }
            }

            // Tạo tên file duy nhất để tránh trùng lặp
            String fileName = thumbnailFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            // Lưu file vào thư mục uploads
            Files.write(filePath, thumbnailFile.getBytes());

            // Lưu đường dẫn file vào cột thumbnail
            exam.setPictures("/" + uploadDir + fileName);
        }

        // Lưu book vào cơ sở dữ liệu
        return examRepository.save(exam);
    }

    @Override
    public Exam updateExam(Long id, ExamDTO examDTO) throws DataNotFoundException{
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find exam with id: " + id));

        Category category = categoryRepository.findById(examDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find category with id: " + examDTO.getCategoryId()));

        Level level = levelRepository.findById(examDTO.getLevelId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find level with id: " + examDTO.getLevelId()));

        exam.setExamName(examDTO.getExamName());
        exam.setCategory(category);
        exam.setLevel(level);

        return examRepository.save(exam);
    }

    @Override
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }
}
