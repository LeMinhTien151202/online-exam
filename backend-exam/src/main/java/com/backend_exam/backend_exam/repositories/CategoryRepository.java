package com.backend_exam.backend_exam.repositories;

import com.backend_exam.backend_exam.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
