package com.backend_exam.backend_exam.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "user_name", length = 100)
    private String userName;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(name = "pass_word", length = 100)
    private String password;

//    @OneToMany(mappedBy = "user")
//    private List<Result> results;

}
