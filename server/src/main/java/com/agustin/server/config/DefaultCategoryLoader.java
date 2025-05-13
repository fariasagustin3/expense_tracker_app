package com.agustin.server.config;

import com.agustin.server.domain.entities.Category;
import com.agustin.server.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DefaultCategoryLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if(categoryRepository.countByIsDefaultTrue() == 0) {
            List<Category> defaultCategories = List.of(
                    new Category(null, "Entretenimiento", "#FFFFFF", true, null, null, null, null),
                    new Category(null, "Salud", "#FFFFFF", true, null, null, null, null),
                    new Category(null, "Salario", "#FFFFFF", true, null, null, null, null),
                    new Category(null, "Transporte", "#FFFFFF", true, null, null, null, null),
                    new Category(null, "Ropa", "#FFFFFF", true, null, null, null, null)

            );

            categoryRepository.saveAll(defaultCategories);
        }
    }
}
