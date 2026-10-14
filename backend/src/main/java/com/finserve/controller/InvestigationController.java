package com.finserve.controller;

import com.finserve.dto.CaseUpdateRequest;
import com.finserve.model.Analyst;
import com.finserve.model.InvestigationCase;
import com.finserve.service.InvestigationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investigations")
@CrossOrigin(originPatterns = "*")
public class InvestigationController {

    private final InvestigationService investigationService;

    @Autowired
    public InvestigationController(InvestigationService investigationService) {
        this.investigationService = investigationService;
    }

    @GetMapping
    public ResponseEntity<List<InvestigationCase>> getAllCases() {
        return ResponseEntity.ok(investigationService.getAllCases());
    }

    @GetMapping("/analysts")
    public ResponseEntity<List<Analyst>> getAllAnalysts() {
        return ResponseEntity.ok(investigationService.getAllAnalysts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestigationCase> getCaseById(@PathVariable Long id) {
        return investigationService.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<InvestigationCase> updateCase(
            @PathVariable Long id,
            @RequestBody CaseUpdateRequest request) {
        return ResponseEntity.ok(investigationService.updateCase(id, request));
    }
}
