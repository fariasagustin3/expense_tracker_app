package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.Category;
import com.agustin.server.domain.entities.Transaction;
import com.agustin.server.domain.entities.User;
import com.agustin.server.dtos.requests.TransactionRequest;
import com.agustin.server.dtos.responses.TransactionDTO;
import com.agustin.server.mappers.TransactionMapper;
import com.agustin.server.repositories.CategoryRepository;
import com.agustin.server.repositories.TransactionRepository;
import com.agustin.server.services.TransactionService;
import com.agustin.server.util.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final CategoryRepository categoryRepository;

    @Override
    public List<TransactionDTO> listTransactions(UUID categoryId, LocalDateTime startDate, LocalDateTime endDate) {

        User user = authenticatedUserProvider.getAuthenticatedUser();

        List<Transaction> transactions;

        // validations to get transactions according to de data from the browser
        if(categoryId != null && startDate != null && endDate != null) {
            transactions = transactionRepository
                    .findByUserIdAndCategoryIdAndCreatedAtBetween(
                            user.getId(),
                            categoryId,
                            startDate,
                            endDate
                    );
        } else if(categoryId != null) {
            transactions = transactionRepository.findByUserIdAndCategoryId(user.getId(), categoryId);
        } else if(startDate != null && endDate != null) {
            transactions = transactionRepository.findByUserIdAndCreatedAtBetween(user.getId(), startDate, endDate);
        } else {
            transactions = transactionRepository.findByUserId(user.getId());
        }

        return transactions.stream().map(transactionMapper::toDTO).collect(Collectors.toList());

    }

    @Override
    public TransactionDTO createTransaction(TransactionRequest transactionRequest) {
        User user = authenticatedUserProvider.getAuthenticatedUser();
        Category category = categoryRepository.findById(transactionRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Transaction transaction = Transaction.builder()
                .title(transactionRequest.getTitle())
                .amount(transactionRequest.getAmount())
                .type(transactionRequest.getType())
                .description(transactionRequest.getDescription())
                .category(category)
                .user(user)
                .build();

        Transaction transactionSaved = transactionRepository.save(transaction);

        return transactionMapper.toDTO(transactionSaved);
    }

    @Override
    public TransactionDTO getTransaction(UUID id) {
        if(id == null) {
            throw new IllegalArgumentException("ID must be provided");
        }

        Optional<Transaction> transaction = transactionRepository.findById(id);

        if(transaction.isEmpty()) {
            throw new IllegalArgumentException("Transaction not found");
        }

        return transactionMapper.toDTO(transaction.get());
    }

    @Override
    public TransactionDTO updateTransaction(UUID id, TransactionRequest request) {
        User user = authenticatedUserProvider.getAuthenticatedUser();
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if(id == null) {
            throw new IllegalArgumentException("ID must be provided");
        }

        Optional<Transaction> transactionSaved = transactionRepository.findById(id);

        if(transactionSaved.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        Transaction transaction = transactionSaved.get();

        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(category);

        transactionRepository.save(transaction);
        return transactionMapper.toDTO(transaction);
    }

    @Override
    public String deleteTransaction(UUID id) {
        transactionRepository.deleteById(id);
        return "Transaction deleted successfully";
    }
}
