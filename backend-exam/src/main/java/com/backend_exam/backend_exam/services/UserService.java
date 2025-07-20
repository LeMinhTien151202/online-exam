package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.UserDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Role;
import com.backend_exam.backend_exam.models.User;
import com.backend_exam.backend_exam.repositories.RoleRepository;
import com.backend_exam.backend_exam.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUSerService{
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Override
    public List<User> getAllUSer() {
        return userRepository.findAll();
    }

    @Override
    public User getByIdUSer(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
    }

    @Override
    public User createUSer(UserDTO userDTO)throws DataNotFoundException {
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found with id: " + userDTO.getRoleId()));

        User user = User.builder()
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .phone(userDTO.getPhone())
                .password(userDTO.getPassword())
                .role(role)
                .build();

        return userRepository.save(user);
    }

    @Override
    public User updateUSer(Long id, UserDTO userDTO)throws DataNotFoundException {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("User not found with id: " + id));

        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found with id: " + userDTO.getRoleId()));

        existingUser.setUserName(userDTO.getUserName());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPhone(userDTO.getPhone());
        existingUser.setPassword(userDTO.getPassword());
        existingUser.setRole(role);

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUSer(Long id) {
        userRepository.deleteById(id);
    }
}
