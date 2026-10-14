package com.finserve.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal amount;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType;

    @Column(name = "payment_code", nullable = false)
    private String paymentCode;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(name = "timestamp")
    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String status = "COMPLETED";

    @Column(name = "risk_score", nullable = false)
    private Double riskScore = 0.0;

    @Column(name = "otp_verified")
    private Boolean otpVerified = false;

    @Column(name = "verified_phone")
    private String verifiedPhone;

    @Column(name = "flagged_by_dsa")
    private String flaggedByDsa;

    public Transaction() {}

    public Transaction(Long id, Long accountId, Long customerId, BigDecimal amount, String transactionType, String paymentCode, String description, LocalDateTime timestamp, String location, String status, Double riskScore, Boolean otpVerified, String verifiedPhone, String flaggedByDsa) {
        this.id = id;
        this.accountId = accountId;
        this.customerId = customerId;
        this.amount = amount;
        this.transactionType = transactionType;
        this.paymentCode = paymentCode;
        this.description = description;
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now();
        this.location = location;
        this.status = status != null ? status : "COMPLETED";
        this.riskScore = riskScore != null ? riskScore : 0.0;
        this.otpVerified = otpVerified != null ? otpVerified : false;
        this.verifiedPhone = verifiedPhone;
        this.flaggedByDsa = flaggedByDsa;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Long accountId;
        private Long customerId;
        private BigDecimal amount;
        private String transactionType;
        private String paymentCode;
        private String description;
        private LocalDateTime timestamp = LocalDateTime.now();
        private String location;
        private String status = "COMPLETED";
        private Double riskScore = 0.0;
        private Boolean otpVerified = false;
        private String verifiedPhone;
        private String flaggedByDsa;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder accountId(Long accountId) { this.accountId = accountId; return this; }
        public Builder customerId(Long customerId) { this.customerId = customerId; return this; }
        public Builder amount(BigDecimal amount) { this.amount = amount; return this; }
        public Builder transactionType(String transactionType) { this.transactionType = transactionType; return this; }
        public Builder paymentCode(String paymentCode) { this.paymentCode = paymentCode; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
        public Builder otpVerified(Boolean otpVerified) { this.otpVerified = otpVerified; return this; }
        public Builder verifiedPhone(String verifiedPhone) { this.verifiedPhone = verifiedPhone; return this; }
        public Builder flaggedByDsa(String flaggedByDsa) { this.flaggedByDsa = flaggedByDsa; return this; }

        public Transaction build() {
            return new Transaction(id, accountId, customerId, amount, transactionType, paymentCode, description, timestamp, location, status, riskScore, otpVerified, verifiedPhone, flaggedByDsa);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }

    public String getPaymentCode() { return paymentCode; }
    public void setPaymentCode(String paymentCode) { this.paymentCode = paymentCode; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }

    public Boolean getOtpVerified() { return otpVerified; }
    public void setOtpVerified(Boolean otpVerified) { this.otpVerified = otpVerified; }

    public String getVerifiedPhone() { return verifiedPhone; }
    public void setVerifiedPhone(String verifiedPhone) { this.verifiedPhone = verifiedPhone; }

    public String getFlaggedByDsa() { return flaggedByDsa; }
    public void setFlaggedByDsa(String flaggedByDsa) { this.flaggedByDsa = flaggedByDsa; }
}
