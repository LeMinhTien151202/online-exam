package com.backend_exam.backend_exam.controllers;
import com.backend_exam.backend_exam.dtos.QuestionDTO;
import com.backend_exam.backend_exam.models.Question;
import com.backend_exam.backend_exam.services.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<Question> getAll() {
        return questionService.getAllQuestion();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            Question q = questionService.getByIdQuestion(id);
            return ResponseEntity.ok(q);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<Question>> getQuestionsByExamId(@PathVariable Long examId) {
        List<Question> questions = questionService.getQuestionsByExamId(examId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody QuestionDTO questionDTO, BindingResult result) {
        try {
            if(result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Question newQuestion = questionService.createQuestion(questionDTO);
            return ResponseEntity.ok(newQuestion);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody QuestionDTO questionDTO) {
        try {
            Question question = questionService.updateQuestion(id, questionDTO);
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }
}
