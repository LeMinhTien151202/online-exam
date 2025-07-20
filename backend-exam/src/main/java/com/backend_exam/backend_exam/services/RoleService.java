package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.RoleDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Role;
import com.backend_exam.backend_exam.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService{
    private final RoleRepository roleRepository;
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElseThrow(() -> new RuntimeException("class not found"));
    }

    @Override
    public Role createRole(RoleDTO roleDTO) {
        Role role = Role.builder()
                .roleName(roleDTO.getRoleName())
                .build();
        return roleRepository.save(role);
    }

    @Override
    public Role updateRole(Long id, RoleDTO roleDTO) throws DataNotFoundException {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find role with id: " + id));
        role.setRoleName(roleDTO.getRoleName());
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
