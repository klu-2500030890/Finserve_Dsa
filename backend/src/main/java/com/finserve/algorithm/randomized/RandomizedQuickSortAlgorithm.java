package com.finserve.algorithm.randomized;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class RandomizedQuickSortAlgorithm {

    private int comparisons = 0;
    private int swaps = 0;

    public AlgorithmResponse execute(int[] amounts) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();
        comparisons = 0;
        swaps = 0;

        if (amounts == null || amounts.length == 0) {
            amounts = new int[]{75000, 12000, 95000, 3200, 48000, 15000, 62000, 89000, 24000, 5000};
        }

        int[] arr = amounts.clone();
        int n = arr.length;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SORT_INIT")
                .description("Initialized Randomized QuickSort on " + n + " transaction amounts: " + Arrays.toString(arr))
                .arrayState(arr.clone())
                .stateMap(Map.of("initialArray", arr.clone(), "length", n))
                .build());

        randomizedQuickSort(arr, 0, n - 1, steps);

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Randomized QuickSort")
                .module("M6_RANDOM_PARALLEL")
                .description("Las Vegas randomized sorting algorithm choosing a uniformly random pivot to guarantee O(N log N) expected time regardless of input distribution.")
                .financialUseCase("High-speed sorting and quantile ranking of millions of high-frequency banking transaction amounts and order-book ticks.")
                .input(Map.of("originalAmounts", amounts))
                .result(Map.of(
                        "sortedAmounts", arr,
                        "totalComparisons", comparisons,
                        "totalSwaps", swaps,
                        "worstCaseAvoided", "Protected against O(N^2) adversarial inputs via uniform random pivoting"
                ))
                .complexity(Map.of(
                        "expectedTime", "O(N log N)",
                        "worstCaseTime", "O(N^2) with probability 2^{-Omega(N)}",
                        "spaceComplexity", "O(log N) stack depth"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Sorted " + n + " transactions in " + comparisons + " comparisons and " + swaps + " swaps.")
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private void randomizedQuickSort(int[] arr, int low, int high, List<AlgorithmStep> steps) {
        if (low < high) {
            int pi = randomizedPartition(arr, low, high, steps);
            randomizedQuickSort(arr, low, pi - 1, steps);
            randomizedQuickSort(arr, pi + 1, high, steps);
        }
    }

    private int randomizedPartition(int[] arr, int low, int high, List<AlgorithmStep> steps) {
        Random rand = new Random();
        int randomPivotIdx = low + rand.nextInt(high - low + 1);

        // Swap random pivot to high
        int pivotVal = arr[randomPivotIdx];
        swap(arr, randomPivotIdx, high);

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("RANDOM_PIVOT_CHOSEN")
                .description("Randomly selected pivot at index " + randomPivotIdx + " (Value = ₹" + pivotVal + ") for subarray [" + low + ".." + high + "]")
                .activeIndices(List.of(low, high, randomPivotIdx))
                .arrayState(arr.clone())
                .stateMap(Map.of("low", low, "high", high, "pivotValue", pivotVal))
                .build());

        int pivot = arr[high];
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            comparisons++;
            if (arr[j] <= pivot) {
                i++;
                if (i != j) {
                    swap(arr, i, j);
                    swaps++;
                }
            }
        }
        swap(arr, i + 1, high);
        swaps++;

        int finalPivotPos = i + 1;
        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("PARTITION_COMPLETED")
                .description("Partitioned around pivot ₹" + pivot + ". Placed at final sorted index " + finalPivotPos)
                .activeIndices(List.of(finalPivotPos))
                .arrayState(arr.clone())
                .stateMap(Map.of("finalPivotIndex", finalPivotPos, "pivotValue", pivot))
                .build());

        return finalPivotPos;
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
