package com.finserve.algorithm.graph;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class EdmondsKarpAlgorithm {

    public AlgorithmResponse execute(int[][] capacity, String[] nodeNames, int source, int sink) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (nodeNames == null || nodeNames.length == 0) {
            nodeNames = new String[]{"Customer", "Branch Bank", "Core Gateway", "Clearing House", "Merchant Node", "Settlement Vault"};
        }
        int n = nodeNames.length;
        if (capacity == null || capacity.length != n) {
            capacity = new int[][]{
                    {0, 20, 10, 0, 0, 0},
                    {0, 0, 0, 30, 10, 0},
                    {0, 0, 0, 15, 20, 0},
                    {0, 0, 0, 0, 0, 25},
                    {0, 0, 0, 0, 0, 25},
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
        int stepCount = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("EDMONDS_KARP_START")
                .description("Starting Edmonds-Karp BFS shortest augmenting path search from " + nodeNames[source] + " to " + nodeNames[sink])
                .matrixState(copyMatrix(rGraph))
                .stateMap(Map.of("source", nodeNames[source], "sink", nodeNames[sink], "maxFlow", 0))
                .build());

        while (bfs(rGraph, source, sink, parent, n)) {
            stepCount++;
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
                    .type("BFS_AUGMENT")
                    .description("BFS found shortest augmenting path (Length=" + (pathNodes.size() - 1) + " edges): [" + String.join(" ➔ ", pathNodes) + "] with Bottleneck Capacity = " + pathFlow + " Lakhs. Total Max Flow: " + maxFlow + " Lakhs")
                    .matrixState(copyMatrix(rGraph))
                    .stateMap(Map.of("path", pathNodes, "pathFlow", pathFlow, "totalFlow", maxFlow, "queueExploration", "BFS Shortest Path"))
                    .build());
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Edmonds-Karp Algorithm (BFS Max Flow)")
                .module("M4_FLOW")
                .description("Guaranteed polynomial-time max flow implementation using Breadth-First Search to find the shortest augmenting path in each step.")
                .financialUseCase("Ensuring deterministic polynomial bounds when assessing transaction limits across global cross-border routing hubs.")
                .input(Map.of("nodes", nodeNames, "source", nodeNames[source], "sink", nodeNames[sink]))
                .result(Map.of(
                        "maxFlow", maxFlow,
                        "bfsIterations", stepCount,
                        "residualGraph", rGraph
                ))
                .complexity(Map.of(
                        "time", "O(V * E^2)",
                        "space", "O(V^2)",
                        "guarantee", "Strongly Polynomial"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Edmonds-Karp computed Max Flow = " + maxFlow + " ₹ Lakhs / sec.")
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private boolean bfs(int[][] rGraph, int s, int t, int[] parent, int n) {
        boolean[] visited = new boolean[n];
        Arrays.fill(parent, -1);
        Queue<Integer> queue = new LinkedList<>();
        queue.add(s);
        visited[s] = true;

        while (!queue.isEmpty()) {
            int u = queue.poll();
            if (u == t) return true;

            for (int v = 0; v < n; v++) {
                if (!visited[v] && rGraph[u][v] > 0) {
                    parent[v] = u;
                    visited[v] = true;
                    queue.add(v);
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
