package com.finserve.service;

import com.finserve.model.AuditLog;
import com.finserve.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    @Autowired
    public AuditService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public List<AuditLog> getRecentLogs() {
        return auditLogRepository.findTop50ByOrderByTimestampDesc();
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }

    public AuditLog logAction(String action, String performedBy, String role, String details, String status) {
        AuditLog log = AuditLog.builder()
                .action(action)
                .performedBy(performedBy)
                .role(role)
                .details(details)
                .status(status)
                .timestamp(LocalDateTime.now())
                .build();
        return auditLogRepository.save(log);
    }
}
