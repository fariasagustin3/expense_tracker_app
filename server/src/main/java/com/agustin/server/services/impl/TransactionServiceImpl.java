package com.agustin.server.services.impl;

import com.agustin.server.domain.entities.Transaction;
import com.agustin.server.dtos.responses.TransactionDTO;
import com.agustin.server.mappers.TransactionMapper;
import com.agustin.server.repositories.TransactionRepository;
import com.agustin.server.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
}
