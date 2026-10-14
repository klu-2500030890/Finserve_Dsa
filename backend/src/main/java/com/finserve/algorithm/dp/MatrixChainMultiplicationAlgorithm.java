package com.finserve.algorithm.dp;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class MatrixChainMultiplicationAlgorithm {

    public AlgorithmResponse execute(int[] p) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (p == null || p.length < 2) {
            p = new int[]{10, 30, 5, 60, 20}; // Matrices: 10x30, 30x5, 5x60, 60x20 (A1, A2, A3, A4)
        }

        int n = p.length - 1; // number of matrices
        int[][] m = new int[n + 1][n + 1];
        int[][] s = new int[n + 1][n + 1];

        for (int i = 1; i <= n; i++) m[i][i] = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("MCM_INIT")
                .description("Initialized Matrix Chain DP for " + n + " financial risk covariance matrices: " + formatMatrices(p))
                .matrixState(copyMatrix(m))
                .stateMap(Map.of("dimensions", p, "numMatrices", n))
                .build());

        // L is chain length
        for (int L = 2; L <= n; L++) {
            for (int i = 1; i <= n - L + 1; i++) {
                int j = i + L - 1;
                m[i][j] = Integer.MAX_VALUE;

                for (int k = i; k <= j - 1; k++) {
                    int q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];

                    if (q < m[i][j]) {
                        m[i][j] = q;
                        s[i][j] = k;

                        steps.add(AlgorithmStep.builder()
                                .stepNumber(steps.size() + 1)
                                .type("MCM_SUBPROBLEM")
                                .description("Chain [A" + i + "..A" + j + "] split at k=" + k + ": Cost = " + q + " scalar multiplications (Left: m[" + i + "][" + k + "]=" + m[i][k] + ", Right: m[" + (k + 1) + "][" + j + "]=" + m[k + 1][j] + ")")
                                .activeIndices(List.of(i, j, k))
                                .matrixState(copyMatrix(m))
                                .stateMap(Map.of("i", i, "j", j, "k", k, "cost", q))
                                .build());
                    }
                }
            }
        }

        String optimalParenthesization = buildOptimalParens(s, 1, n);

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("MCM_COMPLETE")
                .description("Optimal parenthesization derived: " + optimalParenthesization + " with minimal cost: " + m[1][n] + " operations.")
                .matrixState(copyMatrix(m))
                .stateMap(Map.of("optimalParens", optimalParenthesization, "minCost", m[1][n]))
                .build());

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Matrix-Chain Multiplication DP")
                .module("M3_DP")
                .description("Dynamic programming algorithm finding the optimal evaluation order for a sequence of matrix products to minimize scalar operations.")
                .financialUseCase("High-performance quantitative portfolio risk optimization involving large covariance matrix and regression vector products.")
                .input(Map.of("matrixDimensions", p, "matrices", formatMatrices(p)))
                .result(Map.of(
                        "minimumScalarMultiplications", m[1][n],
                        "optimalParenthesization", optimalParenthesization,
                        "costMatrix", m,
                        "splitMatrix", s
                ))
                .complexity(Map.of(
                        "time", "O(N^3)",
                        "space", "O(N^2)",
                        "subproblems", "O(N^2)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Optimal Parenthesization: " + optimalParenthesization + " (Cost: " + m[1][n] + ")")
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private String buildOptimalParens(int[][] s, int i, int j) {
        if (i == j) {
            return "A" + i;
        } else {
            return "(" + buildOptimalParens(s, i, s[i][j]) + " × " + buildOptimalParens(s, s[i][j] + 1, j) + ")";
        }
    }

    private List<String> formatMatrices(int[] p) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < p.length - 1; i++) {
            list.add("A" + (i + 1) + " [" + p[i] + "×" + p[i + 1] + "]");
        }
        return list;
    }

    private int[][] copyMatrix(int[][] original) {
        int[][] copy = new int[original.length][];
        for (int i = 0; i < original.length; i++) {
            copy[i] = original[i].clone();
        }
        return copy;
    }
}
