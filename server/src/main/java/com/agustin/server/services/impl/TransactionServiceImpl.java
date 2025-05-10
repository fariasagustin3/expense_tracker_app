package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.Transaction;
import com.agustin.server.dtos.requests.TransactionRequest;
import com.agustin.server.dtos.responses.TransactionDTO;
import com.agustin.server.mappers.TransactionMapper;
import com.agustin.server.repositories.TransactionRepository;
import com.agustin.server.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    @Override
    public List<TransactionDTO> listTransactions() {
        return transactionRepository.findAll().stream().map(transactionMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public TransactionDTO createTransaction(TransactionRequest transactionRequest) {
        Transaction transaction = Transaction.builder()
                .title(transactionRequest.getTitle())
                .amount(transactionRequest.getAmount())
                .type(transactionRequest.getType())
                .description(transactionRequest.getDescription())
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

        transactionRepository.save(transaction);
        return transactionMapper.toDTO(transaction);
    }

    @Override
    public String deleteTransaction(UUID id) {
        transactionRepository.deleteById(id);
        return "Transaction deleted successfully";
    }
}
