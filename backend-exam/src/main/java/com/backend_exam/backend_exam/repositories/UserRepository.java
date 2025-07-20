package com.backend_exam.backend_exam.repositories;

import com.backend_exam.backend_exam.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
