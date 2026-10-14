package com.finserve.dto;

import java.util.*;

public class AlgorithmResponse {
    private String algorithm;
    private String module;
    private String description;
    private String financialUseCase;
    private Object input;
    private Object result;
    private Map<String, String> complexity = new HashMap<>();
    private List<AlgorithmStep> steps = new ArrayList<>();
    private Double executionTimeMs = 0.0;
    private Long executionTimeNs = 0L;
    private Long memoryUsedKb = 0L;
    private String status = "SUCCESS";
    private String message;
    private Long timestamp = System.currentTimeMillis();

    public AlgorithmResponse() {}

    public AlgorithmResponse(String algorithm, String module, String description, String financialUseCase, Object input, Object result, Map<String, String> complexity, List<AlgorithmStep> steps, Double executionTimeMs, Long executionTimeNs, Long memoryUsedKb, String status, String message, Long timestamp) {
        this.algorithm = algorithm;
        this.module = module;
        this.description = description;
        this.financialUseCase = financialUseCase;
        this.input = input;
        this.result = result;
        this.complexity = complexity != null ? complexity : new HashMap<>();
        this.steps = steps != null ? steps : new ArrayList<>();
        this.executionTimeMs = executionTimeMs != null ? executionTimeMs : 0.0;
        this.executionTimeNs = executionTimeNs != null ? executionTimeNs : 0L;
        this.memoryUsedKb = memoryUsedKb != null ? memoryUsedKb : 0L;
        this.status = status != null ? status : "SUCCESS";
        this.message = message;
        this.timestamp = timestamp != null ? timestamp : System.currentTimeMillis();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String algorithm;
        private String module;
        private String description;
        private String financialUseCase;
        private Object input;
        private Object result;
        private Map<String, String> complexity = new HashMap<>();
        private List<AlgorithmStep> steps = new ArrayList<>();
        private Double executionTimeMs = 0.0;
        private Long executionTimeNs = 0L;
        private Long memoryUsedKb = 0L;
        private String status = "SUCCESS";
        private String message;
        private Long timestamp = System.currentTimeMillis();

        public Builder algorithm(String algorithm) { this.algorithm = algorithm; return this; }
        public Builder module(String module) { this.module = module; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder financialUseCase(String financialUseCase) { this.financialUseCase = financialUseCase; return this; }
        public Builder input(Object input) { this.input = input; return this; }
        public Builder result(Object result) { this.result = result; return this; }
        public Builder complexity(Map<String, String> complexity) { this.complexity = complexity; return this; }
        public Builder steps(List<AlgorithmStep> steps) { this.steps = steps; return this; }
        public Builder executionTimeMs(Double executionTimeMs) { this.executionTimeMs = executionTimeMs; return this; }
        public Builder executionTimeNs(Long executionTimeNs) { this.executionTimeNs = executionTimeNs; return this; }
        public Builder memoryUsedKb(Long memoryUsedKb) { this.memoryUsedKb = memoryUsedKb; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder timestamp(Long timestamp) { this.timestamp = timestamp; return this; }

        public AlgorithmResponse build() {
            return new AlgorithmResponse(algorithm, module, description, financialUseCase, input, result, complexity, steps, executionTimeMs, executionTimeNs, memoryUsedKb, status, message, timestamp);
        }
    }

    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFinancialUseCase() { return financialUseCase; }
    public void setFinancialUseCase(String financialUseCase) { this.financialUseCase = financialUseCase; }

    public Object getInput() { return input; }
    public void setInput(Object input) { this.input = input; }

    public Object getResult() { return result; }
    public void setResult(Object result) { this.result = result; }

    public Map<String, String> getComplexity() { return complexity; }
    public void setComplexity(Map<String, String> complexity) { this.complexity = complexity; }

    public List<AlgorithmStep> getSteps() { return steps; }
    public void setSteps(List<AlgorithmStep> steps) { this.steps = steps; }

    public Double getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(Double executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public Long getExecutionTimeNs() { return executionTimeNs; }
    public void setExecutionTimeNs(Long executionTimeNs) { this.executionTimeNs = executionTimeNs; }

    public Long getMemoryUsedKb() { return memoryUsedKb; }
    public void setMemoryUsedKb(Long memoryUsedKb) { this.memoryUsedKb = memoryUsedKb; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }
}
