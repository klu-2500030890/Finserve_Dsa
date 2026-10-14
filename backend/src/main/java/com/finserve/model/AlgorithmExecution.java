package com.finserve.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "algorithm_executions")
public class AlgorithmExecution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String algorithm;

    @Column(nullable = false)
    private String module;

    @Column(name = "input_size", nullable = false)
    private Integer inputSize;

    @Column(name = "execution_time_ns", nullable = false)
    private Long executionTimeNs;

    @Column(name = "execution_time_ms", nullable = false)
    private Double executionTimeMs;

    @Column(name = "memory_used_kb")
    private Long memoryUsedKb;

    @Column(name = "result_summary", columnDefinition = "TEXT")
    private String resultSummary;

    @Column(name = "complexity_time")
    private String complexityTime;

    @Column(name = "complexity_space")
    private String complexitySpace;

    @Column(name = "executed_by_role")
    private String executedByRole = "USER";

    @Column(name = "executed_at")
    private LocalDateTime executedAt = LocalDateTime.now();

    public AlgorithmExecution() {}

    public AlgorithmExecution(Long id, String algorithm, String module, Integer inputSize, Long executionTimeNs, Double executionTimeMs, Long memoryUsedKb, String resultSummary, String complexityTime, String complexitySpace, String executedByRole, LocalDateTime executedAt) {
        this.id = id;
        this.algorithm = algorithm;
        this.module = module;
        this.inputSize = inputSize;
        this.executionTimeNs = executionTimeNs;
        this.executionTimeMs = executionTimeMs;
        this.memoryUsedKb = memoryUsedKb;
        this.resultSummary = resultSummary;
        this.complexityTime = complexityTime;
        this.complexitySpace = complexitySpace;
        this.executedByRole = executedByRole != null ? executedByRole : "USER";
        this.executedAt = executedAt != null ? executedAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String algorithm;
        private String module;
        private Integer inputSize;
        private Long executionTimeNs;
        private Double executionTimeMs;
        private Long memoryUsedKb;
        private String resultSummary;
        private String complexityTime;
        private String complexitySpace;
        private String executedByRole = "USER";
        private LocalDateTime executedAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder algorithm(String algorithm) { this.algorithm = algorithm; return this; }
        public Builder module(String module) { this.module = module; return this; }
        public Builder inputSize(Integer inputSize) { this.inputSize = inputSize; return this; }
        public Builder executionTimeNs(Long executionTimeNs) { this.executionTimeNs = executionTimeNs; return this; }
        public Builder executionTimeMs(Double executionTimeMs) { this.executionTimeMs = executionTimeMs; return this; }
        public Builder memoryUsedKb(Long memoryUsedKb) { this.memoryUsedKb = memoryUsedKb; return this; }
        public Builder resultSummary(String resultSummary) { this.resultSummary = resultSummary; return this; }
        public Builder complexityTime(String complexityTime) { this.complexityTime = complexityTime; return this; }
        public Builder complexitySpace(String complexitySpace) { this.complexitySpace = complexitySpace; return this; }
        public Builder executedByRole(String executedByRole) { this.executedByRole = executedByRole; return this; }
        public Builder executedAt(LocalDateTime executedAt) { this.executedAt = executedAt; return this; }

        public AlgorithmExecution build() {
            return new AlgorithmExecution(id, algorithm, module, inputSize, executionTimeNs, executionTimeMs, memoryUsedKb, resultSummary, complexityTime, complexitySpace, executedByRole, executedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public Integer getInputSize() { return inputSize; }
    public void setInputSize(Integer inputSize) { this.inputSize = inputSize; }

    public Long getExecutionTimeNs() { return executionTimeNs; }
    public void setExecutionTimeNs(Long executionTimeNs) { this.executionTimeNs = executionTimeNs; }

    public Double getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(Double executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public Long getMemoryUsedKb() { return memoryUsedKb; }
    public void setMemoryUsedKb(Long memoryUsedKb) { this.memoryUsedKb = memoryUsedKb; }

    public String getResultSummary() { return resultSummary; }
    public void setResultSummary(String resultSummary) { this.resultSummary = resultSummary; }

    public String getComplexityTime() { return complexityTime; }
    public void setComplexityTime(String complexityTime) { this.complexityTime = complexityTime; }

    public String getComplexitySpace() { return complexitySpace; }
    public void setComplexitySpace(String complexitySpace) { this.complexitySpace = complexitySpace; }

    public String getExecutedByRole() { return executedByRole; }
    public void setExecutedByRole(String executedByRole) { this.executedByRole = executedByRole; }

    public LocalDateTime getExecutedAt() { return executedAt; }
    public void setExecutedAt(LocalDateTime executedAt) { this.executedAt = executedAt; }
}
