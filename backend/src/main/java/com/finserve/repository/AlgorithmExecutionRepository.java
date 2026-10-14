package com.finserve.repository;

import com.finserve.model.AlgorithmExecution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlgorithmExecutionRepository extends JpaRepository<AlgorithmExecution, Long> {
    List<AlgorithmExecution> findTop20ByOrderByExecutedAtDesc();
    List<AlgorithmExecution> findByModule(String module);
    List<AlgorithmExecution> findByAlgorithm(String algorithm);
}
