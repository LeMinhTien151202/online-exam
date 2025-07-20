package com.backend_exam.backend_exam.repositories;

import com.backend_exam.backend_exam.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExamExamId(Long examId);
}
