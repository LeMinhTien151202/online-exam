package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.ExamDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Exam;

import java.util.List;

public interface IExamService {
    List<Exam> getAllExam();
    Exam getByIdExam(Long id);
    Exam createExam(ExamDTO e)throws DataNotFoundException;
    Exam updateExam(Long id, ExamDTO e)throws DataNotFoundException ;
    void deleteExam(Long id);
}
