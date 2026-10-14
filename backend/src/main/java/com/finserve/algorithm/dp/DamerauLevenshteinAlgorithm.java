package com.finserve.algorithm.dp;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DamerauLevenshteinAlgorithm {

    public AlgorithmResponse execute(String source, String target) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (source == null) source = "TRANSFER";
        if (target == null) target = "TRNASFER";

        int n = source.length();
        int m = target.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) dp[i][0] = i;
        for (int j = 0; j <= m; j++) dp[0][j] = j;

        int transpositionCount = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char sChar = source.charAt(i - 1);
                char tChar = target.charAt(j - 1);

                int cost = (sChar == tChar) ? 0 : 1;

                int deleteCost = dp[i - 1][j] + 1;
                int insertCost = dp[i][j - 1] + 1;
                int replaceCost = dp[i - 1][j - 1] + cost;

                dp[i][j] = Math.min(deleteCost, Math.min(insertCost, replaceCost));

                // Check for Transposition of adjacent characters
                if (i > 1 && j > 1 && source.charAt(i - 1) == target.charAt(j - 2) && source.charAt(i - 2) == target.charAt(j - 1)) {
                    int transposeCost = dp[i - 2][j - 2] + 1;
                    if (transposeCost < dp[i][j]) {
                        dp[i][j] = transposeCost;
                        transpositionCount++;
                        steps.add(AlgorithmStep.builder()
                                .stepNumber(steps.size() + 1)
                                .type("TRANSPOSITION_APPLIED")
                                .description("🔄 TRANSPOSITION detected between adjacent chars ('" + source.charAt(i - 2) + source.charAt(i - 1) + "' vs '" + target.charAt(j - 2) + target.charAt(j - 1) + "'). Cost updated to " + dp[i][j])
                                .activeIndices(List.of(i, j))
                                .matrixState(copyMatrix(dp))
                                .stateMap(Map.of("i", i, "j", j, "transposition", true, "cost", dp[i][j]))
                                .build());
                        continue;
                    }
                }

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("CELL_UPDATE")
                        .description("DP[" + i + "][" + j + "] = " + dp[i][j] + " ('" + sChar + "' -> '" + tChar + "')")
                        .activeIndices(List.of(i, j))
                        .matrixState(copyMatrix(dp))
                        .stateMap(Map.of("i", i, "j", j, "val", dp[i][j]))
                        .build());
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Damerau-Levenshtein Distance")
                .module("M3_DP")
                .description("Dynamic programming edit distance including adjacent character transposition operations.")
                .financialUseCase("Detecting fat-finger clerical errors and transposition anomalies in bank account numbers and IFSC/SWIFT routings.")
                .input(Map.of("source", source, "target", target))
                .result(Map.of(
                        "editDistance", dp[n][m],
                        "transpositionsCount", transpositionCount,
                        "matrix", dp
                ))
                .complexity(Map.of(
                        "time", "O(N * M)",
                        "space", "O(N * M)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Damerau-Levenshtein Distance = " + dp[n][m])
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
