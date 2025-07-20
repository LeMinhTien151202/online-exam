package com.backend_exam.backend_exam.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "roles")
@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Column(name = "role_name", length = 20)
    private String roleName;

//    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
//    private List<User> users;
}
