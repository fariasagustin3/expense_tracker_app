package com.agustin.server.dtos.requests;

import com.agustin.server.domain.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    private String title;
    private BigDecimal amount;
    private Type type;
}
