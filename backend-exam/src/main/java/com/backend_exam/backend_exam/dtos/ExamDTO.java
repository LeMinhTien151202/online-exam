package com.backend_exam.backend_exam.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamDTO {
    private String examName;
    private Long categoryId;
    private Long levelId;
    private String pictures;

}
