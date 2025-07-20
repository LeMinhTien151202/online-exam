package com.backend_exam.backend_exam.repositories;

import com.backend_exam.backend_exam.models.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}
