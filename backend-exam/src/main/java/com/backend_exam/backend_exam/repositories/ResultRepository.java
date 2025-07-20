package com.backend_exam.backend_exam.repositories;

import com.backend_exam.backend_exam.models.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}
