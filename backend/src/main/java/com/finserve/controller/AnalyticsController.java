package com.finserve.controller;

import com.finserve.dto.DashboardStatsDto;
import com.finserve.model.AuditLog;
import com.finserve.service.AuditService;
import com.finserve.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(originPatterns = "*")
public class AnalyticsController {

    private final ReportService reportService;
    private final AuditService auditService;

    @Autowired
    public AnalyticsController(ReportService reportService, AuditService auditService) {
        this.reportService = reportService;
        this.auditService = auditService;
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {
        return ResponseEntity.ok(reportService.getDashboardStats());
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditService.getRecentLogs());
    }
}
