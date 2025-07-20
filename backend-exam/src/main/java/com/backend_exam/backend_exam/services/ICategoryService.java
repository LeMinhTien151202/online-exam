package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.CategoryDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategory();
    Category getByIdCategory(Long id);
    Category createCategory(CategoryDTO categoryDTO);
    Category updateCategory(Long id, CategoryDTO categoryDTO)throws DataNotFoundException;
    void deleteCategory(Long id);
}
