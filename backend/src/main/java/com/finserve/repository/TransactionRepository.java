package com.finserve.repository;

import com.finserve.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountId(Long accountId);
    List<Transaction> findByCustomerId(Long customerId);
    List<Transaction> findByStatus(String status);
    List<Transaction> findTop20ByOrderByTimestampDesc();
    
    @Query("SELECT t FROM Transaction t WHERE LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.paymentCode) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.location) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Transaction> searchTransactions(String query);

    @Query("SELECT t FROM Transaction t WHERE t.riskScore >= :minRiskScore ORDER BY t.riskScore DESC")
    List<Transaction> findHighRiskTransactions(Double minRiskScore);
}
