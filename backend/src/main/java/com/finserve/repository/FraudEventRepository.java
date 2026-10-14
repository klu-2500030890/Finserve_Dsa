package com.finserve.repository;

import com.finserve.model.FraudEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FraudEventRepository extends JpaRepository<FraudEvent, Long> {
    List<FraudEvent> findBySeverity(String severity);
    List<FraudEvent> findByStatus(String status);
    List<FraudEvent> findByTransactionId(Long transactionId);
    List<FraudEvent> findTop20ByOrderByTimestampDesc();
}
