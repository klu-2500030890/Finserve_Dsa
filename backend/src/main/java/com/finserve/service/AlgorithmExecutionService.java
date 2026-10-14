package com.finserve.service;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.model.AlgorithmExecution;
import com.finserve.repository.AlgorithmExecutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AlgorithmExecutionService {

    private final AlgorithmExecutionRepository executionRepository;

    @Autowired
    public AlgorithmExecutionService(AlgorithmExecutionRepository executionRepository) {
        this.executionRepository = executionRepository;
    }

    public AlgorithmExecution recordExecution(AlgorithmResponse response, int inputSize, String role) {
        long memoryUsed = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        long memoryUsedKb = Math.max(128, memoryUsed / 1024);

        AlgorithmExecution execution = AlgorithmExecution.builder()
                .algorithm(response.getAlgorithm())
                .module(response.getModule())
                .inputSize(inputSize)
                .executionTimeNs(response.getExecutionTimeNs() != null ? response.getExecutionTimeNs() : 0L)
                .executionTimeMs(response.getExecutionTimeMs() != null ? response.getExecutionTimeMs() : 0.0)
                .memoryUsedKb(memoryUsedKb)
                .resultSummary(response.getMessage())
                .complexityTime(response.getComplexity() != null ? response.getComplexity().getOrDefault("time", "O(N)") : "O(N)")
                .complexitySpace(response.getComplexity() != null ? response.getComplexity().getOrDefault("space", "O(1)") : "O(1)")
                .executedByRole(role != null ? role : "USER")
                .executedAt(LocalDateTime.now())
                .build();

        return executionRepository.save(execution);
    }

    public List<AlgorithmExecution> getRecentExecutions() {
        return executionRepository.findTop20ByOrderByExecutedAtDesc();
    }

    public List<AlgorithmExecution> getAllExecutions() {
        return executionRepository.findAll();
    }
}
