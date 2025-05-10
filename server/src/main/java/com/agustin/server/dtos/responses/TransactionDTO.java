package com.agustin.server.dtos.responses;

import com.agustin.server.domain.enums.Type;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class TransactionDTO {
    private UUID id;
    private String title;
    private BigDecimal amount;
    private Type type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
