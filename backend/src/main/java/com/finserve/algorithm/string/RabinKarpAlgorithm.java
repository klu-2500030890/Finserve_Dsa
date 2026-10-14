package com.finserve.algorithm.string;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class RabinKarpAlgorithm {

    private static final int BASE = 256;
    private static final long PRIME_MOD = 1000000007L;

    public AlgorithmResponse execute(String text, String pattern) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();
        List<Integer> matchPositions = new ArrayList<>();
        int spuriousHits = 0;

        if (text == null || pattern == null || pattern.isEmpty() || text.length() < pattern.length()) {
            return AlgorithmResponse.builder()
                    .algorithm("Rabin-Karp Rolling Hash")
                    .module("M1_STRING")
                    .description("Rolling hash string search using polynomial hashing with prime modulo arithmetic.")
                    .financialUseCase("Scanning high-volume wire transfer notes, payment instructions, and batch accounts for suspicious signature hashes.")
                    .input(Map.of("text", text != null ? text : "", "pattern", pattern != null ? pattern : ""))
                    .result(Map.of("found", false, "positions", matchPositions, "spuriousHits", 0))
                    .complexity(Map.of("averageTime", "O(N + M)", "worstTime", "O(N * M)", "space", "O(1)"))
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

        // Calculate high power (BASE^(m-1)) % PRIME_MOD
        long h = 1;
        for (int i = 0; i < m - 1; i++) {
            h = (h * BASE) % PRIME_MOD;
        }

        long patternHash = 0;
        long windowHash = 0;

        // Step 1: Compute initial hash of pattern and first window of text
        for (int i = 0; i < m; i++) {
            patternHash = (BASE * patternHash + pattern.charAt(i)) % PRIME_MOD;
            windowHash = (BASE * windowHash + text.charAt(i)) % PRIME_MOD;
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("HASH_INIT")
                .description("Calculated initial polynomial hash. Pattern Hash: " + patternHash + " | Initial Window Hash (text[0.." + (m - 1) + "]): " + windowHash)
                .activeIndices(List.of(0, m - 1))
                .stateMap(Map.of("phase", "INIT", "patternHash", patternHash, "windowHash", windowHash, "windowStr", text.substring(0, m), "modulus", PRIME_MOD))
                .build());

        // Step 2: Slide the window over text
        for (int i = 0; i <= n - m; i++) {
            String currentWindow = text.substring(i, i + m);

            if (patternHash == windowHash) {
                // Potential match - verify character by character to avoid spurious hash collisions
                boolean match = true;
                for (int j = 0; j < m; j++) {
                    if (text.charAt(i + j) != pattern.charAt(j)) {
                        match = false;
                        spuriousHits++;
                        break;
                    }
                }

                if (match) {
                    matchPositions.add(i);
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("HASH_MATCH_VERIFIED")
                            .description("🎯 HASH MATCH & VERIFIED: text[" + i + ".." + (i + m - 1) + "] (\"" + currentWindow + "\") matches pattern \"" + pattern + "\" (Hash = " + windowHash + ")")
                            .activeIndices(List.of(i, i + m - 1))
                            .stateMap(Map.of("windowIndex", i, "patternHash", patternHash, "windowHash", windowHash, "verified", true, "currentWindow", currentWindow))
                            .build());
                } else {
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("HASH_COLLISION_SPURIOUS")
                            .description("⚠️ HASH COLLISION: Hashes match (" + windowHash + ") but character comparison failed! Spurious collision count: " + spuriousHits)
                            .activeIndices(List.of(i, i + m - 1))
                            .stateMap(Map.of("windowIndex", i, "patternHash", patternHash, "windowHash", windowHash, "verified", false, "currentWindow", currentWindow))
                            .build());
                }
            } else {
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("HASH_MISMATCH")
                        .description("Window at index " + i + " (\"" + currentWindow + "\") Hash " + windowHash + " != Pattern Hash " + patternHash)
                        .activeIndices(List.of(i, i + m - 1))
                        .stateMap(Map.of("windowIndex", i, "patternHash", patternHash, "windowHash", windowHash, "currentWindow", currentWindow))
                        .build());
            }

            // Calculate hash value for next window: Remove leading digit, add trailing digit
            if (i < n - m) {
                char charOut = text.charAt(i);
                char charIn = text.charAt(i + m);
                windowHash = (BASE * (windowHash - charOut * h) + charIn) % PRIME_MOD;
                if (windowHash < 0) {
                    windowHash += PRIME_MOD;
                }

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("ROLLING_UPDATE")
                        .description("Rolling hash update: evicted '" + charOut + "' (pos " + i + "), ingested '" + charIn + "' (pos " + (i + m) + ") -> New Window Hash: " + windowHash)
                        .activeIndices(List.of(i + 1, i + m))
                        .stateMap(Map.of("evictedChar", String.valueOf(charOut), "ingestedChar", String.valueOf(charIn), "newWindowHash", windowHash))
                        .build());
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Rabin-Karp Rolling Hash")
                .module("M1_STRING")
                .description("Rolling hash string search using polynomial hashing with prime modulo arithmetic.")
                .financialUseCase("Scanning high-volume wire transfer notes, payment instructions, and batch accounts for suspicious signature hashes.")
                .input(Map.of("text", text, "pattern", pattern, "modulus", PRIME_MOD, "base", BASE))
                .result(Map.of(
                        "found", !matchPositions.isEmpty(),
                        "positions", matchPositions,
                        "matchCount", matchPositions.size(),
                        "spuriousCollisions", spuriousHits,
                        "patternHash", patternHash
                ))
                .complexity(Map.of(
                        "averageTime", "O(N + M)",
                        "worstTime", "O(N * M)",
                        "space", "O(1)",
                        "hashRollingTime", "O(1)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message(matchPositions.isEmpty() ? "No matching hashes found" : "Found " + matchPositions.size() + " occurrence(s) with " + spuriousHits + " spurious collisions")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
