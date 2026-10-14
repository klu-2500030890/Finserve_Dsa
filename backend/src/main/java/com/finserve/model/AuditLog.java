package com.finserve.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String action;

    @Column(name = "performed_by", nullable = false)
    private String performedBy;

    @Column(nullable = false)
    private String role = "USER";

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(nullable = false)
    private String status = "SUCCESS";

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public AuditLog() {}

    public AuditLog(Long id, String action, String performedBy, String role, String details, String status, LocalDateTime timestamp) {
        this.id = id;
        this.action = action;
        this.performedBy = performedBy;
        this.role = role != null ? role : "USER";
        this.details = details;
        this.status = status != null ? status : "SUCCESS";
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String action;
        private String performedBy;
        private String role = "USER";
        private String details;
        private String status = "SUCCESS";
        private LocalDateTime timestamp = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder action(String action) { this.action = action; return this; }
        public Builder performedBy(String performedBy) { this.performedBy = performedBy; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public Builder details(String details) { this.details = details; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public AuditLog build() {
            return new AuditLog(id, action, performedBy, role, details, status, timestamp);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
