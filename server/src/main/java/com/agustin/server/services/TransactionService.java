package com.agustin.server.services;

import com.agustin.server.dtos.responses.TransactionDTO;

import java.util.List;

public interface TransactionService {
    List<TransactionDTO> listTransactions();
}
