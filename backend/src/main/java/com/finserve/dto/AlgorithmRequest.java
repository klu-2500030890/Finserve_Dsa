package com.finserve.dto;

import java.util.*;

public class AlgorithmRequest {
    private String text;
    private String pattern;
    private List<String> patterns;
    private String sourceText;
    private String targetText;
    private int[] numbers;
    private List<Integer> numbersList;
    private Long number;
    private Integer sampleSize;
    private Integer processors;
    private Integer work;
    private Integer span;
    private Map<String, Integer> weights;
    private int[] matrixDimensions;
    private Object graphData;
    private List<List<Integer>> satClauses;
    private Integer numVariables;
    private String userRole = "USER";

    public AlgorithmRequest() {}

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }

    public List<String> getPatterns() { return patterns; }
    public void setPatterns(List<String> patterns) { this.patterns = patterns; }

    public String getSourceText() { return sourceText; }
    public void setSourceText(String sourceText) { this.sourceText = sourceText; }

    public String getTargetText() { return targetText; }
    public void setTargetText(String targetText) { this.targetText = targetText; }

    public int[] getNumbers() { return numbers; }
    public void setNumbers(int[] numbers) { this.numbers = numbers; }

    public List<Integer> getNumbersList() { return numbersList; }
    public void setNumbersList(List<Integer> numbersList) { this.numbersList = numbersList; }

    public Long getNumber() { return number; }
    public void setNumber(Long number) { this.number = number; }

    public Integer getSampleSize() { return sampleSize; }
    public void setSampleSize(Integer sampleSize) { this.sampleSize = sampleSize; }

    public Integer getProcessors() { return processors; }
    public void setProcessors(Integer processors) { this.processors = processors; }

    public Integer getWork() { return work; }
    public void setWork(Integer work) { this.work = work; }

    public Integer getSpan() { return span; }
    public void setSpan(Integer span) { this.span = span; }

    public Map<String, Integer> getWeights() { return weights; }
    public void setWeights(Map<String, Integer> weights) { this.weights = weights; }

    public int[] getMatrixDimensions() { return matrixDimensions; }
    public void setMatrixDimensions(int[] matrixDimensions) { this.matrixDimensions = matrixDimensions; }

    public Object getGraphData() { return graphData; }
    public void setGraphData(Object graphData) { this.graphData = graphData; }

    public List<List<Integer>> getSatClauses() { return satClauses; }
    public void setSatClauses(List<List<Integer>> satClauses) { this.satClauses = satClauses; }

    public Integer getNumVariables() { return numVariables; }
    public void setNumVariables(Integer numVariables) { this.numVariables = numVariables; }

    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
}
