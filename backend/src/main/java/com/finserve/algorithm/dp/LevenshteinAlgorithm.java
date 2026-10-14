package com.finserve.algorithm.dp;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class LevenshteinAlgorithm {

    public AlgorithmResponse execute(String source, String target) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (source == null) source = "TRANSFER";
        if (target == null) target = "TRNASFER";

        int n = source.length();
        int m = target.length();
        int[][] dp = new int[n + 1][m + 1];

        // Base cases
        for (int i = 0; i <= n; i++) dp[i][0] = i;
        for (int j = 0; j <= m; j++) dp[0][j] = j;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("DP_INIT")
                .description("Initialized base DP matrix of dimensions (" + (n + 1) + " x " + (m + 1) + ") for source \"" + source + "\" vs target \"" + target + "\".")
                .matrixState(copyMatrix(dp))
                .stateMap(Map.of("source", source, "target", target, "phase", "INIT"))
                .build());

        // Fill DP table cell by cell
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char sChar = source.charAt(i - 1);
                char tChar = target.charAt(j - 1);

                int deleteCost = dp[i - 1][j] + 1;
                int insertCost = dp[i][j - 1] + 1;
                int replaceCost = dp[i - 1][j - 1] + (sChar == tChar ? 0 : 1);

                dp[i][j] = Math.min(deleteCost, Math.min(insertCost, replaceCost));

                String op = (sChar == tChar) ? "MATCH ('" + sChar + "')" : "SUBSTITUTE ('" + sChar + "' -> '" + tChar + "')";
                if (dp[i][j] == deleteCost && sChar != tChar) op = "DELETE ('" + sChar + "')";
                else if (dp[i][j] == insertCost && sChar != tChar) op = "INSERT ('" + tChar + "')";

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("CELL_COMPUTE")
                        .description("Computed DP[" + i + "][" + j + "] = " + dp[i][j] + " | Source Char: '" + sChar + "' vs Target Char: '" + tChar + "' (" + op + ")")
                        .activeIndices(List.of(i, j))
                        .matrixState(copyMatrix(dp))
                        .stateMap(Map.of("i", i, "j", j, "val", dp[i][j], "deleteCost", deleteCost, "insertCost", insertCost, "replaceCost", replaceCost, "op", op))
                        .build());
            }
        }

        // Backtrack optimal alignment path
        List<Map<String, Object>> alignmentPath = new ArrayList<>();
        int currI = n, currJ = m;
        while (currI > 0 || currJ > 0) {
            Map<String, Object> pathStep = new HashMap<>();
            pathStep.put("i", currI);
            pathStep.put("j", currJ);

            if (currI > 0 && currJ > 0 && (source.charAt(currI - 1) == target.charAt(currJ - 1) || dp[currI][currJ] == dp[currI - 1][currJ - 1] + 1)) {
                pathStep.put("op", source.charAt(currI - 1) == target.charAt(currJ - 1) ? "MATCH" : "REPLACE");
                pathStep.put("sourceChar", source.charAt(currI - 1));
                pathStep.put("targetChar", target.charAt(currJ - 1));
                currI--;
                currJ--;
            } else if (currJ > 0 && dp[currI][currJ] == dp[currI][currJ - 1] + 1) {
                pathStep.put("op", "INSERT");
                pathStep.put("sourceChar", "-");
                pathStep.put("targetChar", target.charAt(currJ - 1));
                currJ--;
            } else {
                pathStep.put("op", "DELETE");
                pathStep.put("sourceChar", source.charAt(currI - 1));
                pathStep.put("targetChar", "-");
                currI--;
            }
            alignmentPath.add(pathStep);
        }
        Collections.reverse(alignmentPath);

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Levenshtein Distance")
                .module("M3_DP")
                .description("Computes minimum edit operations (insertions, deletions, substitutions) to transform source string into target string.")
                .financialUseCase("Fuzzy payment code resolution, correcting misspelled merchant names, and detecting typo-squatted fraudulent account aliases.")
                .input(Map.of("source", source, "target", target))
                .result(Map.of(
                        "editDistance", dp[n][m],
                        "matrix", dp,
                        "sourceLength", n,
                        "targetLength", m,
                        "alignmentPath", alignmentPath
                ))
                .complexity(Map.of(
                        "time", "O(N * M)",
                        "space", "O(N * M)",
                        "optimizedSpace", "O(min(N, M))"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Minimum Edit Distance = " + dp[n][m])
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
