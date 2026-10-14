package com.finserve.controller;

import com.finserve.model.FraudEvent;
import com.finserve.service.FraudAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fraud-events")
@CrossOrigin(originPatterns = "*")
public class FraudController {

    private final FraudAnalysisService fraudAnalysisService;

    @Autowired
    public FraudController(FraudAnalysisService fraudAnalysisService) {
        this.fraudAnalysisService = fraudAnalysisService;
    }

    @GetMapping
    public ResponseEntity<List<FraudEvent>> getAllFraudEvents() {
        return ResponseEntity.ok(fraudAnalysisService.getAllFraudEvents());
    }

    @GetMapping("/recent")
    public ResponseEntity<List<FraudEvent>> getRecentFraudEvents() {
        return ResponseEntity.ok(fraudAnalysisService.getRecentFraudEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FraudEvent> getFraudEventById(@PathVariable Long id) {
        return fraudAnalysisService.getFraudEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<FraudEvent> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(fraudAnalysisService.updateStatus(id, status));
    }
}
