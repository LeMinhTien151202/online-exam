package com.backend_exam.backend_exam.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @Column(length = 500)
    private String content;

//    @Column(name = "question_type", length = 50)
//    private String questionType;

    @Column(name = "answer_A", length = 50)
    private String answerA;

    @Column(name = "answer_B", length = 50)
    private String answerB;

    @Column(name = "answer_C", length = 50)
    private String answerC;

    @Column(name = "answer_D", length = 50)
    private String answerD;

    @Column(name = "answer_correct", length = 50)
    private String answerCorrect;
}
