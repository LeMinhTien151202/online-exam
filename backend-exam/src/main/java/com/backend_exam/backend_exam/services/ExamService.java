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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService implements IExamService{
    private final CategoryRepository categoryRepository;
    private final LevelRepository levelRepository;
    private final ExamRepository examRepository;

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
