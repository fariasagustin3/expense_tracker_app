package com.agustin.server.services;

import com.agustin.server.dtos.requests.CategoryRequest;
import com.agustin.server.dtos.responses.CategoryDTO;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    List<CategoryDTO> listCategories();
    CategoryDTO createCategory(CategoryRequest request);
    CategoryDTO getCategoryById(UUID id);
    CategoryDTO updateCategory(UUID id, CategoryRequest request);
}
