package com.agustin.server.services;

import com.agustin.server.dtos.requests.CategoryRequest;
import com.agustin.server.dtos.responses.CategoryDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> listCategories();
    CategoryDTO createCategory(CategoryRequest request);
}
