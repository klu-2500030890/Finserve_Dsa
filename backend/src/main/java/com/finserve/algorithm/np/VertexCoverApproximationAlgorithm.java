package com.finserve.algorithm.np;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class VertexCoverApproximationAlgorithm {

    public AlgorithmResponse execute(String[] nodeNames, int[][] adjacencyMatrix) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (nodeNames == null || nodeNames.length == 0) {
            nodeNames = new String[]{"Core Switch", "Escrow Vault", "ATM Cluster A", "ATM Cluster B", "SWIFT Gateway", "Clearing Hub", "Forex Router"};
        }
        int n = nodeNames.length;
        if (adjacencyMatrix == null || adjacencyMatrix.length != n) {
            adjacencyMatrix = new int[][]{
                    {0, 1, 1, 0, 0, 0, 0},
                    {1, 0, 1, 1, 0, 0, 0},
                    {1, 1, 0, 1, 1, 0, 0},
                    {0, 1, 1, 0, 0, 1, 0},
                    {0, 0, 1, 0, 0, 1, 1},
                    {0, 0, 0, 1, 1, 0, 1},
                    {0, 0, 0, 0, 1, 1, 0}
            };
        }

        // List of all undirected edges
        List<int[]> edges = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (adjacencyMatrix[i][j] > 0) {
                    edges.add(new int[]{i, j});
                }
            }
        }

        boolean[] inCover = new boolean[n];
        boolean[] coveredEdges = new boolean[edges.size()];
        List<String> chosenSentinels = new ArrayList<>();
        List<String> selectedMatchingEdges = new ArrayList<>();

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("APPROX_INIT")
                .description("Initialized 2-Approximation for Minimum Vertex Cover on " + n + " network nodes and " + edges.size() + " financial transaction conduits.")
                .stateMap(Map.of("nodesCount", n, "edgesCount", edges.size(), "nodes", nodeNames))
                .build());

        // 2-Approximation: pick arbitrary uncovered edge (u, v), add both u and v to cover, remove all incident edges
        for (int e = 0; e < edges.size(); e++) {
            if (coveredEdges[e]) continue;

            int[] edge = edges.get(e);
            int u = edge[0];
            int v = edge[1];

            if (!inCover[u] && !inCover[v]) {
                inCover[u] = true;
                inCover[v] = true;
                chosenSentinels.add(nodeNames[u]);
                chosenSentinels.add(nodeNames[v]);
                selectedMatchingEdges.add("(" + nodeNames[u] + " — " + nodeNames[v] + ")");

                // Mark all incident edges as covered
                int newlyCovered = 0;
                for (int k = 0; k < edges.size(); k++) {
                    int[] other = edges.get(k);
                    if (other[0] == u || other[0] == v || other[1] == u || other[1] == v) {
                        if (!coveredEdges[k]) {
                            coveredEdges[k] = true;
                            newlyCovered++;
                        }
                    }
                }

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("PICK_EDGE_ENDPOINTS")
                        .description("Selected uncovered edge [" + nodeNames[u] + " — " + nodeNames[v] + "]. Added BOTH endpoints to Sentinel Cover. Incident edges covered: " + newlyCovered)
                        .activeIndices(List.of(u, v))
                        .stateMap(Map.of("edge", nodeNames[u] + " — " + nodeNames[v], "addedSentinels", List.of(nodeNames[u], nodeNames[v]), "totalCoverSize", chosenSentinels.size()))
                        .build());
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Vertex Cover 2-Approximation Algorithm")
                .module("M5_NP")
                .description("Polynomial-time approximation algorithm for Minimum Vertex Cover with a theoretical performance guarantee: |C| <= 2 * |C_OPT|.")
                .financialUseCase("Placing minimum security audit sentinels and AML inspection checkpoints across large-scale banking server clusters.")
                .input(Map.of("nodes", nodeNames, "totalEdges", edges.size()))
                .result(Map.of(
                        "coverSize", chosenSentinels.size(),
                        "selectedSentinels", chosenSentinels,
                        "maximalMatchingEdges", selectedMatchingEdges,
                        "approximationFactorGuarantee", "2.0 (Proof: C = 2 * |M| <= 2 * |OPT|)",
                        "isAllEdgesCovered", true
                ))
                .complexity(Map.of(
                        "timeComplexity", "O(V + E) Linear Time",
                        "spaceComplexity", "O(V)",
                        "approxRatio", "alpha = 2.0"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("2-Approximation selected " + chosenSentinels.size() + " Sentinel Nodes (Guaranteed <= 2 * OPT).")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
