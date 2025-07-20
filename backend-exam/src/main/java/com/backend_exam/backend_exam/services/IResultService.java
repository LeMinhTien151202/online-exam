package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.ResultDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Result;

import java.util.List;

public interface IResultService {
    List<Result> getAllResult();
    Result getByIdResult(Long id);
    Result createResult(ResultDTO resultDTO) throws DataNotFoundException;
    Result updateResult(Long id, ResultDTO resultDTO)throws DataNotFoundException;
    void deleteResult(Long id);
}
