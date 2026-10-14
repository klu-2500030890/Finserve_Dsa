package com.finserve.algorithm.dp;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class WeightedEditDistanceAlgorithm {

    public AlgorithmResponse execute(String source, String target, int insertCost, int deleteCost, int substituteCost, int transposeCost) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (source == null) source = "SETTLEMENT";
        if (target == null) target = "SETLEMENT_AUDIT";
        if (insertCost <= 0) insertCost = 1;
        if (deleteCost <= 0) deleteCost = 1;
        if (substituteCost <= 0) substituteCost = 2;
        if (transposeCost <= 0) transposeCost = 2;

        int n = source.length();
        int m = target.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) dp[i][0] = i * deleteCost;
        for (int j = 0; j <= m; j++) dp[0][j] = j * insertCost;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("WEIGHTED_INIT")
                .description("Weights: Insert=" + insertCost + ", Delete=" + deleteCost + ", Substitute=" + substituteCost + ", Transpose=" + transposeCost)
                .matrixState(copyMatrix(dp))
                .stateMap(Map.of("weights", Map.of("insert", insertCost, "delete", deleteCost, "substitute", substituteCost, "transpose", transposeCost)))
                .build());

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char sChar = source.charAt(i - 1);
                char tChar = target.charAt(j - 1);

                int del = dp[i - 1][j] + deleteCost;
                int ins = dp[i][j - 1] + insertCost;
                int sub = dp[i - 1][j - 1] + (sChar == tChar ? 0 : substituteCost);

                dp[i][j] = Math.min(del, Math.min(ins, sub));

                if (i > 1 && j > 1 && source.charAt(i - 1) == target.charAt(j - 2) && source.charAt(i - 2) == target.charAt(j - 1)) {
                    int trans = dp[i - 2][j - 2] + transposeCost;
                    dp[i][j] = Math.min(dp[i][j], trans);
                }

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("WEIGHTED_CELL")
                        .description("DP[" + i + "][" + j + "] = " + dp[i][j])
                        .activeIndices(List.of(i, j))
                        .matrixState(copyMatrix(dp))
                        .stateMap(Map.of("i", i, "j", j, "cost", dp[i][j]))
                        .build());
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Weighted Edit Distance")
                .module("M3_DP")
                .description("Parametric DP allowing custom penalties for deletion, insertion, substitution, and transposition operations.")
                .financialUseCase("Configurable risk penalties: penalizing deleted transaction IDs more severely than minor character typos.")
                .input(Map.of("source", source, "target", target, "insertCost", insertCost, "deleteCost", deleteCost, "substituteCost", substituteCost, "transposeCost", transposeCost))
                .result(Map.of(
                        "totalWeightedDistance", dp[n][m],
                        "matrix", dp
                ))
                .complexity(Map.of("time", "O(N * M)", "space", "O(N * M)"))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Weighted Edit Distance = " + dp[n][m])
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private int[][] copyMatrix(int[][] original) {
        int[][] copy = new int[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = original[i].clone();
        }
        return copy;
    }
}
