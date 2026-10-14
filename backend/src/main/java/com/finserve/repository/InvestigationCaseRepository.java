package com.finserve.repository;

import com.finserve.model.InvestigationCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvestigationCaseRepository extends JpaRepository<InvestigationCase, Long> {
    List<InvestigationCase> findByStatus(String status);
    List<InvestigationCase> findByPriority(String priority);
    List<InvestigationCase> findByAssignedAnalystId(Long assignedAnalystId);
}
