package com.agustin.server.services;

import com.agustin.server.dtos.requests.TransactionRequest;
import com.agustin.server.dtos.responses.TransactionDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TransactionService {
    List<TransactionDTO> listTransactions(UUID categoryId, LocalDate startDate, LocalDate endDate);
    TransactionDTO createTransaction(TransactionRequest transactionRequest);
    TransactionDTO getTransaction(UUID id);
    TransactionDTO updateTransaction(UUID id, TransactionRequest request);
    String deleteTransaction(UUID id);
}
