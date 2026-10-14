package com.finserve.repository;

import com.finserve.model.FinancialDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FinancialDocumentRepository extends JpaRepository<FinancialDocument, Long> {
    List<FinancialDocument> findByDocumentType(String documentType);
    List<FinancialDocument> findByCustomerId(Long customerId);
    
    @Query("SELECT d FROM FinancialDocument d WHERE LOWER(d.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(d.content) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(d.indexedKeywords) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<FinancialDocument> searchDocuments(String query);
}
