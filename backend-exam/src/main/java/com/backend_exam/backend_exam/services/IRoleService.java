package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.RoleDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Role;

import java.util.List;

public interface IRoleService {
    List<Role> getAllRoles();
    Role getRoleById(Long id);
    Role createRole(RoleDTO roleDTO);
    Role updateRole(Long id, RoleDTO roleDTO) throws DataNotFoundException;
    void deleteRole(Long id);
}
