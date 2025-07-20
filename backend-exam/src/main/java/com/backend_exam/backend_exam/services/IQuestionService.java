package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.QuestionDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Question;

import java.util.List;

public interface IQuestionService {
    List<Question> getAllQuestion();
    Question getByIdQuestion(Long id);
    Question createQuestion(QuestionDTO questionDTO) throws DataNotFoundException;
    Question updateQuestion(Long id, QuestionDTO questionDTO) throws DataNotFoundException;
    void deleteQuestion(Long id);
}
