package com.finserve.algorithm.dp;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class BitmaskDPAlgorithm {

    public AlgorithmResponse execute(List<String> operations, int[][] costMatrix) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (operations == null || operations.isEmpty()) {
            operations = List.of("Payment", "Transfer", "KYC Verification", "Fraud Check", "Compliance Audit", "Settlement");
        }

        int n = operations.size();
        if (n > 10) n = 10; // clamp for responsive visualization

        // Default cost matrix if not provided
        if (costMatrix == null || costMatrix.length != n) {
            costMatrix = new int[n][n];
            Random rand = new Random(42);
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    costMatrix[i][j] = (i == j) ? 0 : 10 + rand.nextInt(40);
                }
            }
        }

        int totalStates = 1 << n; // 2^N
        int[][] dp = new int[totalStates][n];
        int[][] parent = new int[totalStates][n];

        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE / 2);
        for (int[] row : parent) Arrays.fill(row, -1);

        // Base case: starting at operation 0
        dp[1][0] = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("BITMASK_INIT")
                .description("Initialized Bitmask DP for " + n + " financial pipeline operations (" + totalStates + " total subset states). Initial state: mask=000001 (Op: " + operations.get(0) + ")")
                .stateMap(Map.of("operations", operations, "totalStates", totalStates, "initialMask", "000001"))
                .build());

        // Iterate over masks (subset sizes)
        for (int mask = 1; mask < totalStates; mask++) {
            for (int u = 0; u < n; u++) {
                if ((mask & (1 << u)) == 0 || dp[mask][u] >= Integer.MAX_VALUE / 2) continue;

                for (int v = 0; v < n; v++) {
                    if ((mask & (1 << v)) == 0) {
                        int nextMask = mask | (1 << v);
                        int newCost = dp[mask][u] + costMatrix[u][v];

                        if (newCost < dp[nextMask][v]) {
                            dp[nextMask][v] = newCost;
                            parent[nextMask][v] = u;

                            String binaryStr = String.format("%" + n + "s", Integer.toBinaryString(nextMask)).replace(' ', '0');
                            steps.add(AlgorithmStep.builder()
                                    .stepNumber(steps.size() + 1)
                                    .type("MASK_TRANSITION")
                                    .description("State transition: Mask [" + binaryStr + "] -> added '" + operations.get(v) + "' from '" + operations.get(u) + "'. Minimal Cost = " + newCost)
                                    .activeIndices(List.of(u, v))
                                    .stateMap(Map.of("mask", binaryStr, "fromOp", operations.get(u), "toOp", operations.get(v), "cost", newCost))
                                    .build());
                        }
                    }
                }
            }
        }

        int finalMask = totalStates - 1;
        int minTotalCost = Integer.MAX_VALUE / 2;
        int lastNode = -1;

        for (int u = 0; u < n; u++) {
            if (dp[finalMask][u] < minTotalCost) {
                minTotalCost = dp[finalMask][u];
                lastNode = u;
            }
        }

        // Reconstruct optimal path
        List<String> optimalOrder = new ArrayList<>();
        int currMask = finalMask;
        int currNode = lastNode;

        while (currNode != -1) {
            optimalOrder.add(operations.get(currNode));
            int prevNode = parent[currMask][currNode];
            currMask ^= (1 << currNode);
            currNode = prevNode;
        }
        Collections.reverse(optimalOrder);

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Bitmask Dynamic Programming")
                .module("M3_DP")
                .description("Subset DP evaluating 2^N state transitions to compute the exact optimal sequencing for financial audit and compliance workflows.")
                .financialUseCase("Optimal sequencing of banking operational tasks (KYC, Fraud Check, AML clearance, Escrow settlement) minimizing latency and dependency overhead.")
                .input(Map.of("operations", operations, "matrixSize", n))
                .result(Map.of(
                        "optimalCost", minTotalCost,
                        "optimalSequence", optimalOrder,
                        "totalEvaluatedStates", totalStates
                ))
                .complexity(Map.of(
                        "time", "O(N^2 * 2^N)",
                        "space", "O(N * 2^N)",
                        "statesCount", String.valueOf(totalStates)
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Optimal sequence found with cost " + minTotalCost + ": " + String.join(" ➔ ", optimalOrder))
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
