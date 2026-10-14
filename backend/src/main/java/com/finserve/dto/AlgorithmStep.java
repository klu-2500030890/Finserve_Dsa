package com.finserve.dto;

import java.util.*;

public class AlgorithmStep {
    private int stepNumber;
    private String type;
    private String description;
    private List<Integer> activeIndices = new ArrayList<>();
    private List<String> highlightNodes = new ArrayList<>();
    private List<String> highlightEdges = new ArrayList<>();
    private Object arrayState;
    private Object matrixState;
    private Object graphState;
    private Map<String, Object> stateMap = new HashMap<>();

    public AlgorithmStep() {}

    public AlgorithmStep(int stepNumber, String type, String description, List<Integer> activeIndices, List<String> highlightNodes, List<String> highlightEdges, Object arrayState, Object matrixState, Object graphState, Map<String, Object> stateMap) {
        this.stepNumber = stepNumber;
        this.type = type;
        this.description = description;
        this.activeIndices = activeIndices != null ? activeIndices : new ArrayList<>();
        this.highlightNodes = highlightNodes != null ? highlightNodes : new ArrayList<>();
        this.highlightEdges = highlightEdges != null ? highlightEdges : new ArrayList<>();
        this.arrayState = arrayState;
        this.matrixState = matrixState;
        this.graphState = graphState;
        this.stateMap = stateMap != null ? stateMap : new HashMap<>();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private int stepNumber;
        private String type;
        private String description;
        private List<Integer> activeIndices = new ArrayList<>();
        private List<String> highlightNodes = new ArrayList<>();
        private List<String> highlightEdges = new ArrayList<>();
        private Object arrayState;
        private Object matrixState;
        private Object graphState;
        private Map<String, Object> stateMap = new HashMap<>();

        public Builder stepNumber(int stepNumber) { this.stepNumber = stepNumber; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder activeIndices(List<Integer> activeIndices) { this.activeIndices = activeIndices; return this; }
        public Builder highlightNodes(List<String> highlightNodes) { this.highlightNodes = highlightNodes; return this; }
        public Builder highlightEdges(List<String> highlightEdges) { this.highlightEdges = highlightEdges; return this; }
        public Builder arrayState(Object arrayState) { this.arrayState = arrayState; return this; }
        public Builder matrixState(Object matrixState) { this.matrixState = matrixState; return this; }
        public Builder graphState(Object graphState) { this.graphState = graphState; return this; }
        public Builder stateMap(Map<String, Object> stateMap) { this.stateMap = stateMap; return this; }

        public AlgorithmStep build() {
            return new AlgorithmStep(stepNumber, type, description, activeIndices, highlightNodes, highlightEdges, arrayState, matrixState, graphState, stateMap);
        }
    }

    public int getStepNumber() { return stepNumber; }
    public void setStepNumber(int stepNumber) { this.stepNumber = stepNumber; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<Integer> getActiveIndices() { return activeIndices; }
    public void setActiveIndices(List<Integer> activeIndices) { this.activeIndices = activeIndices; }

    public List<String> getHighlightNodes() { return highlightNodes; }
    public void setHighlightNodes(List<String> highlightNodes) { this.highlightNodes = highlightNodes; }

    public List<String> getHighlightEdges() { return highlightEdges; }
    public void setHighlightEdges(List<String> highlightEdges) { this.highlightEdges = highlightEdges; }

    public Object getArrayState() { return arrayState; }
    public void setArrayState(Object arrayState) { this.arrayState = arrayState; }

    public Object getMatrixState() { return matrixState; }
    public void setMatrixState(Object matrixState) { this.matrixState = matrixState; }

    public Object getGraphState() { return graphState; }
    public void setGraphState(Object graphState) { this.graphState = graphState; }

    public Map<String, Object> getStateMap() { return stateMap; }
    public void setStateMap(Map<String, Object> stateMap) { this.stateMap = stateMap; }
}
