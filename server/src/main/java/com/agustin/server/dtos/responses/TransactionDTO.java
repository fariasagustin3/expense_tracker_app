package com.agustin.server.dtos.responses;

import com.agustin.server.domain.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private UUID id;
    private String title;
    private BigDecimal amount;
    private String description;
    private Type type;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}
