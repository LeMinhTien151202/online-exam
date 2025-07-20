package com.backend_exam.backend_exam.repositories;

import com.backend_exam.backend_exam.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
