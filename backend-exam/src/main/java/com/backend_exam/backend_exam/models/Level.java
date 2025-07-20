package com.backend_exam.backend_exam.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "levels")
@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer levelId;

    @Column(name = "level_name", length = 20)
    private String levelName;

//    @OneToMany(mappedBy = "level")
//    private List<Exam> exams;
}
