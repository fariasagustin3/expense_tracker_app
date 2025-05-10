package com.agustin.server.controllers;

import com.agustin.server.dtos.requests.TransactionRequest;
import com.agustin.server.dtos.responses.TransactionDTO;
import com.agustin.server.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> listTransactions() {
        List<TransactionDTO> transactions = transactionService.listTransactions();

        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactions);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(@RequestBody TransactionRequest request) {
        System.out.println(request);
        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactionService.createTransaction(request));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TransactionDTO> getTransaction(@PathVariable UUID id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactionService.getTransaction(id));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(
            @PathVariable UUID id,
            @RequestBody TransactionRequest request
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(transactionService.updateTransaction(id, request));
        } catch(IllegalArgumentException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }
}
