package com.finserve.algorithm.graph;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class FordFulkersonAlgorithm {

    public AlgorithmResponse execute(int[][] capacity, String[] nodeNames, int source, int sink) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (nodeNames == null || nodeNames.length == 0) {
            nodeNames = new String[]{"Customer Bank", "Interbank Switch", "Clearing House", "Settlement Network", "Payment Gateway", "Merchant Bank"};
        }
        int n = nodeNames.length;
        if (capacity == null || capacity.length != n) {
            // Default financial network flow capacity matrix
            capacity = new int[][]{
                    {0, 16, 13, 0, 0, 0},
                    {0, 0, 10, 12, 0, 0},
                    {0, 4, 0, 0, 14, 0},
                    {0, 0, 9, 0, 0, 20},
                    {0, 0, 0, 7, 0, 4},
                    {0, 0, 0, 0, 0, 0}
            };
        }
        if (source < 0 || source >= n) source = 0;
        if (sink < 0 || sink >= n) sink = n - 1;

        int[][] rGraph = new int[n][n];
        for (int u = 0; u < n; u++) {
            System.arraycopy(capacity[u], 0, rGraph[u], 0, n);
        }

        int[] parent = new int[n];
        int maxFlow = 0;
        int augmentationCount = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("FLOW_INIT")
                .description("Initialized Ford-Fulkerson Network Flow. Source: " + nodeNames[source] + " -> Sink: " + nodeNames[sink])
                .matrixState(copyMatrix(rGraph))
                .stateMap(Map.of("source", nodeNames[source], "sink", nodeNames[sink], "maxFlow", 0, "nodeNames", nodeNames))
                .build());

        // Augment flow while path exists via DFS
        while (dfsPath(rGraph, source, sink, parent, n)) {
            augmentationCount++;
            int pathFlow = Integer.MAX_VALUE;
            List<String> pathNodes = new ArrayList<>();

            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                pathFlow = Math.min(pathFlow, rGraph[u][v]);
            }

            for (int v = sink; v != source; v = parent[v]) {
                pathNodes.add(nodeNames[v]);
                int u = parent[v];
                rGraph[u][v] -= pathFlow;
                rGraph[v][u] += pathFlow;
            }
            pathNodes.add(nodeNames[source]);
            Collections.reverse(pathNodes);

            maxFlow += pathFlow;

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("AUGMENTING_PATH_FOUND")
                    .description("Augmentation #" + augmentationCount + ": Found path [" + String.join(" ➔ ", pathNodes) + "] with Bottleneck Capacity = " + pathFlow + " Lakhs. Total Max Flow: " + maxFlow + " Lakhs")
                    .matrixState(copyMatrix(rGraph))
                    .stateMap(Map.of("path", pathNodes, "bottleneckFlow", pathFlow, "totalFlow", maxFlow, "augmentationNumber", augmentationCount))
                    .build());
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Ford-Fulkerson Method")
                .module("M4_FLOW")
                .description("Computes the maximum feasible liquidity/transaction flow from source to sink in a banking channel network via augmenting paths.")
                .financialUseCase("Interbank settlement throughput analysis, liquidity bottleneck detection, and systemic stress-testing under peak volume.")
                .input(Map.of("nodes", nodeNames, "source", nodeNames[source], "sink", nodeNames[sink]))
                .result(Map.of(
                        "maxFlow", maxFlow,
                        "augmentationCount", augmentationCount,
                        "residualGraph", rGraph,
                        "initialCapacity", capacity
                ))
                .complexity(Map.of(
                        "time", "O(E * |max_flow|)",
                        "space", "O(V^2)",
                        "augmentingMethod", "DFS Path Finding"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Max Flow = " + maxFlow + " ₹ Lakhs / sec across network across " + augmentationCount + " augmentations.")
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private boolean dfsPath(int[][] rGraph, int s, int t, int[] parent, int n) {
        boolean[] visited = new boolean[n];
        Arrays.fill(parent, -1);
        Stack<Integer> stack = new Stack<>();
        stack.push(s);
        visited[s] = true;

        while (!stack.isEmpty()) {
            int u = stack.pop();
            if (u == t) return true;

            for (int v = 0; v < n; v++) {
                if (!visited[v] && rGraph[u][v] > 0) {
                    parent[v] = u;
                    visited[v] = true;
                    stack.push(v);
                }
            }
        }
        return visited[t];
    }

    private int[][] copyMatrix(int[][] original) {
        int[][] copy = new int[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = original[i].clone();
        }
        return copy;
    }
}
