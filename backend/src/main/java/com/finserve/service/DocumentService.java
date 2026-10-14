package com.finserve.service;

import com.finserve.model.FinancialDocument;
import com.finserve.repository.FinancialDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    private final FinancialDocumentRepository documentRepository;

    @Autowired
    public DocumentService(FinancialDocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<FinancialDocument> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Optional<FinancialDocument> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    public List<FinancialDocument> searchDocuments(String query) {
        if (query == null || query.trim().isEmpty()) {
            return documentRepository.findAll();
        }
        return documentRepository.searchDocuments(query.trim());
    }

    public FinancialDocument saveDocument(FinancialDocument doc) {
        return documentRepository.save(doc);
    }

    public boolean deleteDocument(Long id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
