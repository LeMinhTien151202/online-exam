package com.backend_exam.backend_exam.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "exams")
@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Exam extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer examId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private Level level;

    @Column(name = "exam_name", length = 100)
    private String examName;

    private String pictures;

//    @OneToMany(mappedBy = "exam")
//    private List<Question> questions;
//
//    @OneToMany(mappedBy = "exam")
//    private List<Result> results;
}
