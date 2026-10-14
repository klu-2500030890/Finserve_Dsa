package com.finserve.algorithm.graph;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class MinCutAlgorithm {

    public AlgorithmResponse execute(int[][] capacity, String[] nodeNames, int source, int sink) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (nodeNames == null || nodeNames.length == 0) {
            nodeNames = new String[]{"Customer Bank", "Interbank Switch", "Clearing House", "Settlement Network", "Payment Gateway", "Merchant Bank"};
        }
        int n = nodeNames.length;
        if (capacity == null || capacity.length != n) {
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

        // Compute Max Flow via BFS (Edmonds-Karp)
        while (bfs(rGraph, source, sink, parent, n)) {
            int pathFlow = Integer.MAX_VALUE;
            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                pathFlow = Math.min(pathFlow, rGraph[u][v]);
            }
            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                rGraph[u][v] -= pathFlow;
                rGraph[v][u] += pathFlow;
            }
            maxFlow += pathFlow;
        }

        // Find vertices reachable from source in residual graph (Set S)
        boolean[] isVisited = new boolean[n];
        dfsResidual(rGraph, source, isVisited, n);

        List<String> sourcePartitionS = new ArrayList<>();
        List<String> sinkPartitionT = new ArrayList<>();
        List<Map<String, Object>> minCutEdges = new ArrayList<>();
        int minCutCapacity = 0;

        for (int i = 0; i < n; i++) {
            if (isVisited[i]) sourcePartitionS.add(nodeNames[i]);
            else sinkPartitionT.add(nodeNames[i]);
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("CUT_PARTITION")
                .description("Residual Graph DFS partitioned network into Source Component S: " + sourcePartitionS + " and Sink Component T: " + sinkPartitionT)
                .stateMap(Map.of("setS", sourcePartitionS, "setT", sinkPartitionT))
                .build());

        // Edges from S to T in original graph form the min cut
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (isVisited[i] && !isVisited[j] && capacity[i][j] > 0) {
                    minCutCapacity += capacity[i][j];
                    Map<String, Object> edge = new HashMap<>();
                    edge.put("from", nodeNames[i]);
                    edge.put("to", nodeNames[j]);
                    edge.put("capacity", capacity[i][j]);
                    minCutEdges.add(edge);

                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("CUT_EDGE_IDENTIFIED")
                            .description("🔴 Critical Min-Cut Edge: (" + nodeNames[i] + " ➔ " + nodeNames[j] + ") with Capacity = " + capacity[i][j] + " Lakhs. Cutting this edge isolates transaction liquidity.")
                            .stateMap(Map.of("cutEdge", edge, "cumulativeCutCapacity", minCutCapacity))
                            .build());
                }
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Minimum Cut (Max-Flow Min-Cut Theorem)")
                .module("M4_FLOW")
                .description("Identifies the minimum capacity set of network edges whose removal completely disconnects source from sink. By duality, Min-Cut Capacity = Max Flow.")
                .financialUseCase("Vulnerability analysis: pinpointing the most critical transaction corridors whose outage would cause total banking liquidity gridlock.")
                .input(Map.of("nodes", nodeNames, "source", nodeNames[source], "sink", nodeNames[sink]))
                .result(Map.of(
                        "minCutCapacity", minCutCapacity,
                        "maxFlowEquivalence", maxFlow,
                        "sourceSetS", sourcePartitionS,
                        "sinkSetT", sinkPartitionT,
                        "criticalCutEdges", minCutEdges
                ))
                .complexity(Map.of(
                        "time", "O(V * E^2)",
                        "space", "O(V^2)",
                        "theorem", "Max-Flow Min-Cut Duality"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Min-Cut Capacity = " + minCutCapacity + " ₹ Lakhs. Found " + minCutEdges.size() + " critical bottleneck channel(s).")
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

    private void dfsResidual(int[][] rGraph, int s, boolean[] visited, int n) {
        visited[s] = true;
        for (int i = 0; i < n; i++) {
            if (rGraph[s][i] > 0 && !visited[i]) {
                dfsResidual(rGraph, i, visited, n);
            }
        }
    }
}
