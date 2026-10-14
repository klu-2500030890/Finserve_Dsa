package com.finserve.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fraud_events")
public class FraudEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id", nullable = false)
    private Long transactionId;

    @Column(nullable = false)
    private String pattern;

    @Column(nullable = false)
    private String severity = "HIGH";

    @Column(name = "detected_by", nullable = false)
    private String detectedBy;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(nullable = false)
    private String status = "DETECTED";

    @Column(name = "timestamp")
    private LocalDateTime timestamp = LocalDateTime.now();

    public FraudEvent() {}

    public FraudEvent(Long id, Long transactionId, String pattern, String severity, String detectedBy, String details, String status, LocalDateTime timestamp) {
        this.id = id;
        this.transactionId = transactionId;
        this.pattern = pattern;
        this.severity = severity != null ? severity : "HIGH";
        this.detectedBy = detectedBy;
        this.details = details;
        this.status = status != null ? status : "DETECTED";
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Long transactionId;
        private String pattern;
        private String severity = "HIGH";
        private String detectedBy;
        private String details;
        private String status = "DETECTED";
        private LocalDateTime timestamp = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder transactionId(Long transactionId) { this.transactionId = transactionId; return this; }
        public Builder pattern(String pattern) { this.pattern = pattern; return this; }
        public Builder severity(String severity) { this.severity = severity; return this; }
        public Builder detectedBy(String detectedBy) { this.detectedBy = detectedBy; return this; }
        public Builder details(String details) { this.details = details; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public FraudEvent build() {
            return new FraudEvent(id, transactionId, pattern, severity, detectedBy, details, status, timestamp);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTransactionId() { return transactionId; }
    public void setTransactionId(Long transactionId) { this.transactionId = transactionId; }

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getDetectedBy() { return detectedBy; }
    public void setDetectedBy(String detectedBy) { this.detectedBy = detectedBy; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
