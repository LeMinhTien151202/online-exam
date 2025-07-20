package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.UserDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.User;

import java.util.List;

public interface IUSerService {
    List<User> getAllUSer();
    User getByIdUSer(Long id);
    User createUSer(UserDTO userDTO) throws DataNotFoundException;
    User updateUSer(Long id, UserDTO userDTO)throws DataNotFoundException;
    void deleteUSer(Long id);
}
