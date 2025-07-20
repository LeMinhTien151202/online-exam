package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.QuestionDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Exam;
import com.backend_exam.backend_exam.models.Question;
import com.backend_exam.backend_exam.repositories.ExamRepository;
import com.backend_exam.backend_exam.repositories.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService{
    private final QuestionRepository questionRepository;
    private final ExamRepository examRepository;
    @Override
    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }

    @Override
    public Question getByIdQuestion(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new RuntimeException("question not found"));
    }

    public List<Question> getQuestionsByExamId(Long examId) {
        return questionRepository.findByExamExamId(examId);
    }

    @Override
    public Question createQuestion(QuestionDTO questionDTO) throws DataNotFoundException{
        Exam exam = examRepository.findById(questionDTO.getExamId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find exam with id: " + questionDTO.getExamId()));
        Question question = Question.builder()
                .content(questionDTO.getContent())
                .answerA(questionDTO.getAnswerA())
                .answerB(questionDTO.getAnswerB())
                .answerC(questionDTO.getAnswerC())
                .answerD(questionDTO.getAnswerD())
                .answerCorrect(questionDTO.getAnswerCorrect())
                .exam(exam)
                .build();
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Long id, QuestionDTO questionDTO) throws DataNotFoundException {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find question with id: " + id));
        Exam exam = examRepository.findById(questionDTO.getExamId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find exam with id: " + questionDTO.getExamId()));
        question.setContent(questionDTO.getContent());
        question.setAnswerA(questionDTO.getAnswerA());
        question.setAnswerB(questionDTO.getAnswerB());
        question.setAnswerC(questionDTO.getAnswerC());
        question.setAnswerD(questionDTO.getAnswerD());
        question.setAnswerCorrect(questionDTO.getAnswerCorrect());
        question.setExam(exam);
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
