package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.Category;
import com.agustin.server.dtos.requests.CategoryRequest;
import com.agustin.server.dtos.responses.CategoryDTO;
import com.agustin.server.mappers.CategoryMapper;
import com.agustin.server.repositories.CategoryRepository;
import com.agustin.server.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public List<CategoryDTO> listCategories() {
        return categoryRepository.findAll().stream().map(categoryMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public CategoryDTO createCategory(CategoryRequest request) {
        Category categoryCreated = Category.builder()
                .name(request.getName())
                .color(request.getColor())
                .isDefault(request.getIsDefault())
                .build();

        Category category = categoryRepository.save(categoryCreated);

        return categoryMapper.toDTO(category);
    }
}
