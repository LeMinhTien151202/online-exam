package com.backend_exam.backend_exam.services;

import com.backend_exam.backend_exam.dtos.CategoryDTO;
import com.backend_exam.backend_exam.exceptions.DataNotFoundException;
import com.backend_exam.backend_exam.models.Category;
import com.backend_exam.backend_exam.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService{
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategory() { return categoryRepository.findAll(); }
    public Category getByIdCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("class not found"));
    }
    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = Category.builder()
                .categoryName(categoryDTO.getCategoryName())
                .build();
        return categoryRepository.save(category);
    }
    public Category updateCategory(Long id, CategoryDTO categoryDTO) throws DataNotFoundException{
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find category with id: " + id));
        category.setCategoryName(categoryDTO.getCategoryName());
        return categoryRepository.save(category);
    }
    public void deleteCategory(Long id) { categoryRepository.deleteById(id); }
}
