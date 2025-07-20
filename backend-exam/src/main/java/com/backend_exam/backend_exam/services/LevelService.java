package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.LevelDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Level;
import com.backend_exam.backend_exam.repositories.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LevelService implements ILevelService{
    private final LevelRepository levelRepository;

    @Override
    public List<Level> getAllLevel() {
        return levelRepository.findAll();
    }

    @Override
    public Level getByIdLevel(Long id) {
        return  levelRepository.findById(id).orElseThrow(() -> new RuntimeException("level not found"));
    }

    @Override
    public Level createLevel(LevelDTO levelDTO) {
        Level level = Level.builder()
                .levelName(levelDTO.getLevelName())
                .build();
        return levelRepository.save(level);
    }

    @Override
    public Level updateLevel(Long id, LevelDTO levelDTO) throws DataNotFoundException{
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find level with id: " + id));
        level.setLevelName(levelDTO.getLevelName());
        return levelRepository.save(level);
    }

    @Override
    public void deleteLevel(Long id) {
        levelRepository.deleteById(id);
    }
}
