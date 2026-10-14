package com.finserve.controller;

import com.finserve.model.FinancialDocument;
import com.finserve.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(originPatterns = "*")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public ResponseEntity<List<FinancialDocument>> getAllDocuments(@RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(documentService.searchDocuments(search));
        }
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinancialDocument> getDocumentById(@PathVariable Long id) {
        return documentService.getDocumentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FinancialDocument> createDocument(@RequestBody FinancialDocument document) {
        return ResponseEntity.ok(documentService.saveDocument(document));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        if (documentService.deleteDocument(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
