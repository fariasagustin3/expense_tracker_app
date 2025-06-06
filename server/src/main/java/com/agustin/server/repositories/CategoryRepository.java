package com.agustin.server.repositories;

import com.agustin.server.domain.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Long countByIsDefaultTrue();
    List<Category> findByUserId(UUID id);
    List<Category> findByIsDefaultTrue();
}
