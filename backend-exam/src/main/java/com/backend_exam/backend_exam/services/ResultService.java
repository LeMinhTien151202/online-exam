package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.ResultDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Exam;
import com.backend_exam.backend_exam.models.Result;
import com.backend_exam.backend_exam.models.User;
import com.backend_exam.backend_exam.repositories.ExamRepository;
import com.backend_exam.backend_exam.repositories.ResultRepository;
import com.backend_exam.backend_exam.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService implements IResultService{
    private final ResultRepository resultRepository;
    private final UserRepository userRepository;
    private final ExamRepository examRepository;

    @Override
    public List<Result> getAllResult() {
        return resultRepository.findAll();
    }

    @Override
    public Result getByIdResult(Long id) {
        return resultRepository.findById(id).orElseThrow(() -> new RuntimeException("result not found"));
    }

    @Override
    public Result createResult(ResultDTO resultDTO)throws DataNotFoundException {
        User user = userRepository.findById(resultDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + resultDTO.getUserId()));
        Exam exam = examRepository.findById(resultDTO.getExamId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find exam with id: " + resultDTO.getExamId()));
        Result result = Result.builder()
                .user(user)
                .exam(exam)
                .score(resultDTO.getScore())
                .build();
        return resultRepository.save(result);
    }

    @Override
    public Result updateResult(Long id, ResultDTO resultDTO)throws DataNotFoundException {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find result with id: " + id));
        User user = userRepository.findById(resultDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + resultDTO.getUserId()));
        Exam exam = examRepository.findById(resultDTO.getExamId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find exam with id: " + resultDTO.getExamId()));
        result.setUser(user);
        result.setExam(exam);
        result.setScore(resultDTO.getScore());
        return resultRepository.save(result);
    }

    @Override
    public void deleteResult(Long id) {
        resultRepository.deleteById(id);
    }
}
