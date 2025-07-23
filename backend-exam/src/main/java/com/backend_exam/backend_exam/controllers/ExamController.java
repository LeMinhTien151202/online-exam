package com.backend_exam.backend_exam.controllers;
import com.backend_exam.backend_exam.dtos.ExamDTO;
import com.backend_exam.backend_exam.models.Exam;
import com.backend_exam.backend_exam.services.ExamService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/exams")
public class ExamController {
    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public List<Exam> getAll() {
        return examService.getAllExam();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            Exam e = examService.getByIdExam(id);
            return ResponseEntity.ok(e);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> create(@ModelAttribute @Valid Exam exam,
                                    BindingResult result,
                                    @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnailFile) {
        try {
            if(result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Exam newExam = examService.saveExamWithThumbnail(exam,thumbnailFile);
            return ResponseEntity.ok(newExam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}",consumes = {"multipart/form-data"})
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @ModelAttribute @Valid Exam exam,
                                    BindingResult result,
                                    @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnailFile) throws Exception {
        try {
            Exam exam1 = examService.getByIdExam(id);
            exam1.setCategory(exam.getCategory());
            exam1.setLevel(exam.getLevel());
            exam1.setExamName(exam.getExamName());
            Exam newExam = examService.saveExamWithThumbnail(exam1,thumbnailFile);
            return ResponseEntity.ok(newExam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.ok().build();
    }
}
