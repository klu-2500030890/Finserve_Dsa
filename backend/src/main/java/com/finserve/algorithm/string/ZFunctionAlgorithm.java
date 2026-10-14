package com.finserve.algorithm.string;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ZFunctionAlgorithm {

    public AlgorithmResponse execute(String input) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (input == null || input.isEmpty()) {
            return AlgorithmResponse.builder()
                    .algorithm("Z-Function (Z-Algorithm)")
                    .module("M1_STRING")
                    .description("Calculates the Z-array where Z[i] is the length of the longest substring starting at i that is also a prefix of S.")
                    .financialUseCase("Detecting recurring financial fraud tokens, cyclical transaction reference structures, and duplicated remittance memos.")
                    .input(Map.of("string", ""))
                    .result(Map.of("zArray", new int[0]))
                    .complexity(Map.of("time", "O(N)", "space", "O(N)", "best", "O(N)", "worst", "O(N)"))
                    .steps(steps)
                    .executionTimeMs(0.01)
                    .executionTimeNs(System.nanoTime() - startNs)
                    .status("SUCCESS")
                    .message("Empty input string")
                    .timestamp(System.currentTimeMillis())
                    .build();
        }

        int n = input.length();
        int[] z = new int[n];
        z[0] = n; // or 0 conventionally; we record 0 or n

        int l = 0, r = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("Z_INIT")
                .description("Initialize Z-array for string \"" + input + "\" (Length = " + n + "). Active Z-box window [L, R] = [0, 0].")
                .arrayState(z.clone())
                .stateMap(Map.of("L", l, "R", r, "i", 0, "z", z.clone()))
                .build());

        for (int i = 1; i < n; i++) {
            if (i <= r) {
                int k = i - l;
                if (z[k] < r - i + 1) {
                    z[i] = z[k];
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("Z_BOX_INTERNAL")
                            .description("Index " + i + " is inside Z-box [" + l + ", " + r + "]. Using previous Z[" + k + "] = " + z[k] + " directly (no extra comparisons needed).")
                            .activeIndices(List.of(i, k, l, r))
                            .arrayState(z.clone())
                            .stateMap(Map.of("L", l, "R", r, "i", i, "k", k, "z", z.clone()))
                            .build());
                    continue;
                } else {
                    l = i;
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("Z_BOX_EXTEND")
                            .description("Index " + i + " reaches beyond current Z-box boundary R=" + r + ". Shifting L to " + l + " and extending comparisons.")
                            .activeIndices(List.of(i, l, r))
                            .arrayState(z.clone())
                            .stateMap(Map.of("L", l, "R", r, "i", i, "z", z.clone()))
                            .build());
                }
            } else {
                l = r = i;
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("Z_BOX_NEW")
                        .description("Index " + i + " is strictly outside previous Z-box. Opening new Z-box [L, R] = [" + l + ", " + r + "].")
                        .activeIndices(List.of(i))
                        .arrayState(z.clone())
                        .stateMap(Map.of("L", l, "R", r, "i", i, "z", z.clone()))
                        .build());
            }

            while (r < n && input.charAt(r) == input.charAt(r - l)) {
                r++;
            }
            z[i] = r - l;
            r--; // boundary is inclusive

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("Z_CALCULATED")
                    .description("Z[" + i + "] computed as " + z[i] + ". Longest prefix match starting at " + i + " is \"" + input.substring(i, Math.min(n, i + z[i])) + "\". Active Z-box is [" + l + ", " + r + "].")
                    .activeIndices(List.of(i, l, Math.max(l, r)))
                    .arrayState(z.clone())
                    .stateMap(Map.of("L", l, "R", r, "i", i, "zValue", z[i], "z", z.clone()))
                    .build());
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Z-Function (Z-Algorithm)")
                .module("M1_STRING")
                .description("Calculates the Z-array where Z[i] is the length of the longest substring starting at i that matches prefix of S.")
                .financialUseCase("Detecting recurring financial fraud tokens, cyclical transaction reference structures, and duplicated remittance memos.")
                .input(Map.of("string", input))
                .result(Map.of(
                        "zArray", z,
                        "stringLength", n,
                        "maxMatchLength", Arrays.stream(z).skip(1).max().orElse(0)
                ))
                .complexity(Map.of(
                        "time", "O(N)",
                        "space", "O(N)",
                        "worst", "O(N)",
                        "comparisons", "< 2N"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Z-array computed in linear O(N) time")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
