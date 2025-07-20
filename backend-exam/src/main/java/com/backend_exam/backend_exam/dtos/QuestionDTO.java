package com.backend_exam.backend_exam.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private String content;
    private String answerA;
    private String answerB;
    private String answerC;
    private String answerD;
    private String answerCorrect;
    private Long examId;
}
