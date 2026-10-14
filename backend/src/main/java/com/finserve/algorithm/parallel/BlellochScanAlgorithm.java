package com.finserve.algorithm.parallel;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class BlellochScanAlgorithm {

    public AlgorithmResponse execute(int[] input) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (input == null || input.length == 0) {
            input = new int[]{1000, 2500, 4000, 1500, 3000, 5000, 2000, 6000}; // 8 elements (power of 2)
        }

        // Pad to next power of 2
        int origLen = input.length;
        int n = 1;
        while (n < origLen) n <<= 1;

        int[] a = new int[n];
        System.arraycopy(input, 0, a, 0, origLen);

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("BLELLOCH_INIT")
                .description("Initialized Blelloch Parallel Prefix Scan on " + n + " transaction values: " + Arrays.toString(a))
                .arrayState(a.clone())
                .stateMap(Map.of("initialArray", a.clone(), "powerOfTwoSize", n))
                .build());

        // Step 1: Up-Sweep (Reduce phase)
        for (int d = 0; d < (int) (Math.log(n) / Math.log(2)); d++) {
            int stepSize = 1 << (d + 1);
            int halfStep = 1 << d;

            for (int k = 0; k < n; k += stepSize) {
                a[k + stepSize - 1] += a[k + halfStep - 1];
            }

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("UP_SWEEP_LEVEL")
                    .description("Up-Sweep (Reduce Tree) Level d=" + d + " (stride=" + stepSize + "): Parallel partial sums computed.")
                    .arrayState(a.clone())
                    .stateMap(Map.of("phase", "UP_SWEEP", "level", d, "array", a.clone()))
                    .build());
        }

        // Set last element to 0 (identity for exclusive scan)
        int totalSum = a[n - 1];
        a[n - 1] = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SET_IDENTITY_ZERO")
                .description("Total Array Sum = " + totalSum + ". Root element set to 0 for exclusive down-sweep propagation.")
                .arrayState(a.clone())
                .stateMap(Map.of("totalSum", totalSum))
                .build());

        // Step 2: Down-Sweep phase
        for (int d = (int) (Math.log(n) / Math.log(2)) - 1; d >= 0; d--) {
            int stepSize = 1 << (d + 1);
            int halfStep = 1 << d;

            for (int k = 0; k < n; k += stepSize) {
                int t = a[k + halfStep - 1];
                a[k + halfStep - 1] = a[k + stepSize - 1];
                a[k + stepSize - 1] += t;
            }

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("DOWN_SWEEP_LEVEL")
                    .description("Down-Sweep (Distribute Tree) Level d=" + d + ": Dispatched prefix offsets to child nodes.")
                    .arrayState(a.clone())
                    .stateMap(Map.of("phase", "DOWN_SWEEP", "level", d, "array", a.clone()))
                    .build());
        }

        // Slice back to original length
        int[] exclusivePrefix = Arrays.copyOf(a, origLen);
        int[] inclusivePrefix = new int[origLen];
        for (int i = 0; i < origLen; i++) {
            inclusivePrefix[i] = exclusivePrefix[i] + input[i];
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Blelloch Parallel Prefix Scan")
                .module("M6_RANDOM_PARALLEL")
                .description("Work-efficient parallel prefix sum algorithm performing O(N) total work and O(log N) parallel step span.")
                .financialUseCase("Parallel computation of running account balances, cumulative risk exposure, and ledger audit checkpoints across GPU / SIMD processors.")
                .input(Map.of("originalValues", input))
                .result(Map.of(
                        "exclusivePrefixSum", exclusivePrefix,
                        "inclusivePrefixSum", inclusivePrefix,
                        "totalAggregateSum", totalSum,
                        "originalLength", origLen
                ))
                .complexity(Map.of(
                        "workComplexity", "O(N) Work-Efficient",
                        "spanStepComplexity", "O(log N) Depth",
                        "processorsRequired", "O(N / log N)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Blelloch Scan completed with Total Sum = ₹" + totalSum + " in O(log N) parallel span depth.")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
