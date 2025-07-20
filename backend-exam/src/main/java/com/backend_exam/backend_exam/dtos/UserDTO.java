package com.backend_exam.backend_exam.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userName;
    private String email;
    private String phone;
    private String password;
    private Long roleId;
}
