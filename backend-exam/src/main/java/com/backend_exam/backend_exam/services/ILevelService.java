package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.LevelDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Level;

import java.util.List;

public interface ILevelService {
    List<Level> getAllLevel();
    Level getByIdLevel(Long id);
    Level createLevel(LevelDTO levelDTO);
    Level updateLevel(Long id, LevelDTO levelDTO) throws DataNotFoundException;
    void deleteLevel(Long id);
}
