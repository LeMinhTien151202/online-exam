package com.backend_exam.backend_exam.controllers;

import com.backend_exam.backend_exam.dtos.CategoryDTO;
import com.backend_exam.backend_exam.models.Category;
import com.backend_exam.backend_exam.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    //ResponseEntity là một lớp trong Spring Framework dùng để biểu diễn toàn bộ phản hồi HTTP,
    // bao gồm mã trạng thái (status code), header, và phần thân (body).
    // Dấu ? cho biết kiểu của phần thân có thể là bất kỳ kiểu nào.
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(categoryService.getAllCategory());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            Category c = categoryService.getByIdCategory(id);
            return ResponseEntity.ok(c);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    //BindingResult: Đây là một interface của Spring dùng để chứa kết quả của quá trình kiểm tra hợp lệ (validation) của đối tượng categoryDTO
    public ResponseEntity<?> create(@RequestBody CategoryDTO categoryDTO, BindingResult result) {
        try {
            //Kiểm tra lỗi validation
            if(result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Category newCategory = categoryService.createCategory(categoryDTO);
            return ResponseEntity.ok(newCategory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        try {
            Category category = categoryService.updateCategory(id, categoryDTO);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
