package com.finserve.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "investigation_cases")
public class InvestigationCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String priority = "HIGH";

    @Column(nullable = false)
    private String status = "OPEN";

    @Column(name = "assigned_analyst_id")
    private Long assignedAnalystId;

    @Column(name = "assigned_analyst_name")
    private String assignedAnalystName;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public InvestigationCase() {}

    public InvestigationCase(Long id, String title, String priority, String status, Long assignedAnalystId, String assignedAnalystName, Long transactionId, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.priority = priority != null ? priority : "HIGH";
        this.status = status != null ? status : "OPEN";
        this.assignedAnalystId = assignedAnalystId;
        this.assignedAnalystName = assignedAnalystName;
        this.transactionId = transactionId;
        this.notes = notes;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String title;
        private String priority = "HIGH";
        private String status = "OPEN";
        private Long assignedAnalystId;
        private String assignedAnalystName;
        private Long transactionId;
        private String notes;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder priority(String priority) { this.priority = priority; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder assignedAnalystId(Long assignedAnalystId) { this.assignedAnalystId = assignedAnalystId; return this; }
        public Builder assignedAnalystName(String assignedAnalystName) { this.assignedAnalystName = assignedAnalystName; return this; }
        public Builder transactionId(Long transactionId) { this.transactionId = transactionId; return this; }
        public Builder notes(String notes) { this.notes = notes; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public InvestigationCase build() {
            return new InvestigationCase(id, title, priority, status, assignedAnalystId, assignedAnalystName, transactionId, notes, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getAssignedAnalystId() { return assignedAnalystId; }
    public void setAssignedAnalystId(Long assignedAnalystId) { this.assignedAnalystId = assignedAnalystId; }

    public String getAssignedAnalystName() { return assignedAnalystName; }
    public void setAssignedAnalystName(String assignedAnalystName) { this.assignedAnalystName = assignedAnalystName; }

    public Long getTransactionId() { return transactionId; }
    public void setTransactionId(Long transactionId) { this.transactionId = transactionId; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
