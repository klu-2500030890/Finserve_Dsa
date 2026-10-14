package com.finserve.service;

import com.finserve.dto.CaseUpdateRequest;
import com.finserve.model.Analyst;
import com.finserve.model.AuditLog;
import com.finserve.model.InvestigationCase;
import com.finserve.repository.AnalystRepository;
import com.finserve.repository.AuditLogRepository;
import com.finserve.repository.InvestigationCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class InvestigationService {

    private final InvestigationCaseRepository caseRepository;
    private final AnalystRepository analystRepository;
    private final AuditLogRepository auditLogRepository;

    @Autowired
    public InvestigationService(
            InvestigationCaseRepository caseRepository,
            AnalystRepository analystRepository,
            AuditLogRepository auditLogRepository) {
        this.caseRepository = caseRepository;
        this.analystRepository = analystRepository;
        this.auditLogRepository = auditLogRepository;
    }

    public List<InvestigationCase> getAllCases() {
        return caseRepository.findAll();
    }

    public List<Analyst> getAllAnalysts() {
        return analystRepository.findAll();
    }

    public Optional<InvestigationCase> getCaseById(Long id) {
        return caseRepository.findById(id);
    }

    public InvestigationCase updateCase(Long id, CaseUpdateRequest req) {
        InvestigationCase c = caseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Case ID " + id + " not found."));

        if (req.getStatus() != null) c.setStatus(req.getStatus());
        if (req.getPriority() != null) c.setPriority(req.getPriority());
        if (req.getNotes() != null) c.setNotes(req.getNotes());

        if (req.getAssignedAnalystId() != null) {
            c.setAssignedAnalystId(req.getAssignedAnalystId());
            analystRepository.findById(req.getAssignedAnalystId())
                    .ifPresent(a -> c.setAssignedAnalystName(a.getName()));
        }

        InvestigationCase saved = caseRepository.save(c);

        AuditLog auditLog = AuditLog.builder()
                .action("UPDATE_INVESTIGATION_CASE")
                .performedBy(req.getPerformedByRole() != null ? req.getPerformedByRole() : "MANAGER")
                .role(req.getPerformedByRole() != null ? req.getPerformedByRole() : "MANAGER")
                .details("Case #" + id + " updated status=" + c.getStatus() + ", analyst=" + c.getAssignedAnalystName())
                .status("SUCCESS")
                .timestamp(LocalDateTime.now())
                .build();
        auditLogRepository.save(auditLog);

        return saved;
    }
}
