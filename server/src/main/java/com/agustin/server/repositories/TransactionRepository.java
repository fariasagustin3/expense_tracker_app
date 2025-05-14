package com.agustin.server.repositories;

import com.agustin.server.domain.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByUserId(UUID id);
    List<Transaction> findByUserIdAndCategoryId(UUID userId, UUID categoryId);
    List<Transaction> findByUserIdAndCreatedAtBetween(UUID userId, LocalDate startDate, LocalDate endTime);
    List<Transaction> findByUserIdAndCategoryIdAndCreatedAtBetween(UUID userId, UUID categoryId, LocalDate startDate, LocalDate endDate);
}
