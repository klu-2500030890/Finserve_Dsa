package com.finserve.algorithm.string;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class KMPAlgorithm {

    public AlgorithmResponse execute(String text, String pattern) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();
        List<Integer> matchPositions = new ArrayList<>();

        if (text == null || pattern == null || pattern.isEmpty() || text.length() < pattern.length()) {
            return AlgorithmResponse.builder()
                    .algorithm("Knuth-Morris-Pratt (KMP)")
                    .module("M1_STRING")
                    .description("Linear-time single pattern matching using longest proper prefix that is also suffix (LPS).")
                    .financialUseCase("Scanning financial transaction memo and SWIFT payment codes for exact suspicious tokens.")
                    .input(Map.of("text", text != null ? text : "", "pattern", pattern != null ? pattern : ""))
                    .result(Map.of("found", false, "positions", matchPositions, "matchCount", 0))
                    .complexity(Map.of("time", "O(N + M)", "space", "O(M)", "best", "O(N)", "worst", "O(N + M)"))
                    .steps(steps)
                    .executionTimeMs(0.01)
                    .executionTimeNs(System.nanoTime() - startNs)
                    .status("SUCCESS")
                    .message("No match or invalid input")
                    .timestamp(System.currentTimeMillis())
                    .build();
        }

        int n = text.length();
        int m = pattern.length();
        int[] lps = new int[m];

        // Step 1: Build LPS Array
        int len = 0;
        int i = 1;
        lps[0] = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("LPS_INIT")
                .description("Initializing LPS array for pattern: \"" + pattern + "\". Setting LPS[0] = 0.")
                .arrayState(lps.clone())
                .stateMap(Map.of("phase", "LPS_CONSTRUCTION", "i", 0, "len", 0, "lps", lps.clone()))
                .build());

        while (i < m) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                len++;
                lps[i] = len;
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("LPS_MATCH")
                        .description("Pattern character '" + pattern.charAt(i) + "' at index " + i + " matches '" + pattern.charAt(len - 1) + "' at index " + (len - 1) + ". LPS[" + i + "] = " + len)
                        .activeIndices(List.of(i, len - 1))
                        .arrayState(lps.clone())
                        .stateMap(Map.of("phase", "LPS_CONSTRUCTION", "i", i, "len", len, "lps", lps.clone()))
                        .build());
                i++;
            } else {
                if (len != 0) {
                    int prevLen = len;
                    len = lps[len - 1];
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("LPS_FALLBACK")
                            .description("Mismatch in LPS at index " + i + ". Falling back from len=" + prevLen + " to LPS[" + (prevLen - 1) + "] = " + len)
                            .activeIndices(List.of(i, len))
                            .arrayState(lps.clone())
                            .stateMap(Map.of("phase", "LPS_CONSTRUCTION", "i", i, "len", len, "lps", lps.clone()))
                            .build());
                } else {
                    lps[i] = 0;
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("LPS_ZERO")
                            .description("No prefix matches at index " + i + ". LPS[" + i + "] = 0")
                            .activeIndices(List.of(i))
                            .arrayState(lps.clone())
                            .stateMap(Map.of("phase", "LPS_CONSTRUCTION", "i", i, "len", 0, "lps", lps.clone()))
                            .build());
                    i++;
                }
            }
        }

        // Step 2: Search in Text
        int textIdx = 0;
        int patIdx = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SEARCH_START")
                .description("Starting KMP search on text of length " + n + " with pattern of length " + m)
                .activeIndices(List.of(0, 0))
                .stateMap(Map.of("phase", "TEXT_SEARCH", "textIdx", 0, "patIdx", 0, "lps", lps.clone()))
                .build());

        while (textIdx < n) {
            char tChar = text.charAt(textIdx);
            char pChar = pattern.charAt(patIdx);

            if (tChar == pChar) {
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("MATCH")
                        .description("Character MATCH: text[" + textIdx + "] ('" + tChar + "') == pattern[" + patIdx + "] ('" + pChar + "')")
                        .activeIndices(List.of(textIdx, patIdx))
                        .stateMap(Map.of("phase", "TEXT_SEARCH", "textIdx", textIdx, "patIdx", patIdx, "status", "MATCHING"))
                        .build());
                textIdx++;
                patIdx++;

                if (patIdx == m) {
                    int foundAt = textIdx - patIdx;
                    matchPositions.add(foundAt);
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("FOUND")
                            .description("🎉 PATTERN FOUND at index " + foundAt + "! Shifting pattern using LPS[" + (patIdx - 1) + "] = " + lps[patIdx - 1])
                            .activeIndices(List.of(foundAt, textIdx - 1))
                            .stateMap(Map.of("phase", "TEXT_SEARCH", "foundIndex", foundAt, "lpsShift", lps[patIdx - 1]))
                            .build());
                    patIdx = lps[patIdx - 1];
                }
            } else {
                if (patIdx != 0) {
                    int oldPatIdx = patIdx;
                    patIdx = lps[patIdx - 1];
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("MISMATCH_SHIFT")
                            .description("Mismatch: text[" + textIdx + "] ('" + tChar + "') != pattern[" + oldPatIdx + "] ('" + pChar + "'). Skipping redundant checks by jumping patIdx -> LPS[" + (oldPatIdx - 1) + "] = " + patIdx)
                            .activeIndices(List.of(textIdx, patIdx))
                            .stateMap(Map.of("phase", "TEXT_SEARCH", "textIdx", textIdx, "newPatIdx", patIdx, "shiftAmount", oldPatIdx - patIdx))
                            .build());
                } else {
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("MISMATCH_ADVANCE")
                            .description("Mismatch at pattern start: text[" + textIdx + "] ('" + tChar + "') != pattern[0] ('" + pChar + "'). Advancing text pointer to " + (textIdx + 1))
                            .activeIndices(List.of(textIdx, 0))
                            .stateMap(Map.of("phase", "TEXT_SEARCH", "textIdx", textIdx + 1, "patIdx", 0))
                            .build());
                    textIdx++;
                }
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Knuth-Morris-Pratt (KMP)")
                .module("M1_STRING")
                .description("Linear-time single pattern matching using longest proper prefix that is also suffix (LPS array).")
                .financialUseCase("Scanning financial transaction memo and SWIFT payment codes for exact suspicious tokens.")
                .input(Map.of("text", text, "pattern", pattern))
                .result(Map.of(
                        "found", !matchPositions.isEmpty(),
                        "positions", matchPositions,
                        "matchCount", matchPositions.size(),
                        "lpsArray", lps
                ))
                .complexity(Map.of(
                        "time", "O(N + M)",
                        "space", "O(M)",
                        "preprocessing", "O(M)",
                        "matching", "O(N)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message(matchPositions.isEmpty() ? "Pattern not found in transaction text" : "Found " + matchPositions.size() + " occurrence(s)")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
