package com.finserve.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "financial_documents")
public class FinancialDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(nullable = false)
    private String title;

    @Column(name = "document_type", nullable = false)
    private String documentType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "indexed_keywords", columnDefinition = "TEXT")
    private String indexedKeywords;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public FinancialDocument() {}

    public FinancialDocument(Long id, Long customerId, String title, String documentType, String content, String indexedKeywords, LocalDateTime createdAt) {
        this.id = id;
        this.customerId = customerId;
        this.title = title;
        this.documentType = documentType;
        this.content = content;
        this.indexedKeywords = indexedKeywords;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Long customerId;
        private String title;
        private String documentType;
        private String content;
        private String indexedKeywords;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder customerId(Long customerId) { this.customerId = customerId; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder documentType(String documentType) { this.documentType = documentType; return this; }
        public Builder content(String content) { this.content = content; return this; }
        public Builder indexedKeywords(String indexedKeywords) { this.indexedKeywords = indexedKeywords; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public FinancialDocument build() {
            return new FinancialDocument(id, customerId, title, documentType, content, indexedKeywords, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getIndexedKeywords() { return indexedKeywords; }
    public void setIndexedKeywords(String indexedKeywords) { this.indexedKeywords = indexedKeywords; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
