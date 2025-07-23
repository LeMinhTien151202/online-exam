package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.ExamDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Exam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IExamService {
    List<Exam> getAllExam();
    Exam getByIdExam(Long id);
    Exam saveExamWithThumbnail(Exam exam, MultipartFile thumbnailFile) throws IOException;
    Exam createExam(ExamDTO e)throws DataNotFoundException;
    Exam updateExam(Long id, ExamDTO e)throws DataNotFoundException ;
    void deleteExam(Long id);
}
