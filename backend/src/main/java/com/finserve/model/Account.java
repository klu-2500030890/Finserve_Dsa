package com.finserve.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "account_number", nullable = false, unique = true)
    private String accountNumber;

    @Column(name = "account_type", nullable = false)
    private String accountType;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;

    @Column(nullable = false)
    private String currency = "INR";

    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Account() {}

    public Account(Long id, Long customerId, String accountNumber, String accountType, BigDecimal balance, String currency, String status, LocalDateTime createdAt) {
        this.id = id;
        this.customerId = customerId;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance != null ? balance : BigDecimal.ZERO;
        this.currency = currency != null ? currency : "INR";
        this.status = status != null ? status : "ACTIVE";
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Long customerId;
        private String accountNumber;
        private String accountType;
        private BigDecimal balance = BigDecimal.ZERO;
        private String currency = "INR";
        private String status = "ACTIVE";
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder customerId(Long customerId) { this.customerId = customerId; return this; }
        public Builder accountNumber(String accountNumber) { this.accountNumber = accountNumber; return this; }
        public Builder accountType(String accountType) { this.accountType = accountType; return this; }
        public Builder balance(BigDecimal balance) { this.balance = balance; return this; }
        public Builder currency(String currency) { this.currency = currency; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Account build() {
            return new Account(id, customerId, accountNumber, accountType, balance, currency, status, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
