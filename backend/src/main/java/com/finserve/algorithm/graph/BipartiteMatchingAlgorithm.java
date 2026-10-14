package com.finserve.algorithm.graph;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class BipartiteMatchingAlgorithm {

    public AlgorithmResponse execute(List<String> analysts, List<String> cases, boolean[][] eligibilityMatrix) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (analysts == null || analysts.isEmpty()) {
            analysts = List.of("A1 (AML Lead)", "A2 (Cyber Forensics)", "A3 (High-Value Fraud)", "A4 (Compliance Special)");
        }
        if (cases == null || cases.isEmpty()) {
            cases = List.of("C1 (ATM Skimming #89)", "C2 (SWIFT Typo Heist)", "C3 (Phishing Ring #412)", "C4 (Dormant Account Drain)");
        }

        int m = analysts.size();
        int n = cases.size();

        if (eligibilityMatrix == null || eligibilityMatrix.length != m || eligibilityMatrix[0].length != n) {
            eligibilityMatrix = new boolean[][]{
                    {true, true, false, false},
                    {false, true, true, false},
                    {false, false, true, true},
                    {true, false, false, true}
            };
        }

        int[] matchCaseToAnalyst = new int[n];
        Arrays.fill(matchCaseToAnalyst, -1);
        int matchCount = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("MATCHING_INIT")
                .description("Initialized Maximum Bipartite Matching for " + m + " Analysts vs " + n + " Investigation Cases.")
                .stateMap(Map.of("analysts", analysts, "cases", cases, "totalPairs", m * n))
                .build());

        for (int u = 0; u < m; u++) {
            boolean[] visited = new boolean[n];
            if (bpm(eligibilityMatrix, u, visited, matchCaseToAnalyst, n)) {
                matchCount++;
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("MATCH_AUGMENTED")
                        .description("Assigned Analyst [" + analysts.get(u) + "] to a valid investigation case. Current total matched: " + matchCount)
                        .activeIndices(List.of(u))
                        .stateMap(Map.of("analyst", analysts.get(u), "matchCount", matchCount))
                        .build());
            }
        }

        List<Map<String, String>> finalAssignments = new ArrayList<>();
        for (int c = 0; c < n; c++) {
            if (matchCaseToAnalyst[c] != -1) {
                finalAssignments.add(Map.of(
                        "analyst", analysts.get(matchCaseToAnalyst[c]),
                        "case", cases.get(c)
                ));
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Maximum Bipartite Matching (Hopcroft-Karp / Augmenting Path)")
                .module("M4_FLOW")
                .description("Finds the maximum cardinality matching between bipartite sets of fraud analysts and open investigation cases.")
                .financialUseCase("Optimal assignment of specialized banking fraud investigators to critical suspicious activity alerts based on skill certification.")
                .input(Map.of("analysts", analysts, "cases", cases))
                .result(Map.of(
                        "totalMatchedCases", matchCount,
                        "assignments", finalAssignments,
                        "unassignedCases", n - matchCount,
                        "unassignedAnalysts", m - matchCount
                ))
                .complexity(Map.of(
                        "augmentingPathTime", "O(V * E)",
                        "hopcroftKarpTime", "O(E * sqrt(V))",
                        "space", "O(V + E)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Optimal Matching found: " + matchCount + "/" + Math.min(m, n) + " cases assigned to analysts.")
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private boolean bpm(boolean[][] bpGraph, int u, boolean[] seen, int[] matchR, int n) {
        for (int v = 0; v < n; v++) {
            if (bpGraph[u][v] && !seen[v]) {
                seen[v] = true;
                if (matchR[v] < 0 || bpm(bpGraph, matchR[v], seen, matchR, n)) {
                    matchR[v] = u;
                    return true;
                }
            }
        }
        return false;
    }
}
