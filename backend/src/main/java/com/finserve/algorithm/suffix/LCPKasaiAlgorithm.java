package com.finserve.algorithm.suffix;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class LCPKasaiAlgorithm {

    public AlgorithmResponse execute(String text) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (text == null || text.isEmpty()) {
            text = "TRANSFER_NEFT_IMPS_TRANSFER_NEFT_RTGS$";
        }
        if (!text.endsWith("$")) {
            text = text + "$";
        }

        int n = text.length();

        // Step 1: Build Suffix Array
        List<SuffixArrayAlgorithm.SuffixItem> suffixList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            suffixList.add(new SuffixArrayAlgorithm.SuffixItem(i, text.substring(i)));
        }
        suffixList.sort(Comparator.comparing(a -> a.suffix));

        int[] sa = new int[n];
        int[] rank = new int[n];
        for (int i = 0; i < n; i++) {
            sa[i] = suffixList.get(i).index;
            rank[sa[i]] = i;
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SUFFIX_ARRAY_READY")
                .description("Base Suffix Array and Rank Array prepared for Kasai's LCP construction.")
                .arrayState(sa)
                .stateMap(Map.of("sa", sa, "rank", rank))
                .build());

        // Step 2: Kasai's Linear LCP Algorithm
        int[] lcp = new int[n];
        int k = 0;

        for (int i = 0; i < n; i++) {
            if (rank[i] == 0) {
                lcp[0] = 0;
                continue;
            }

            int prevSuffixIdx = sa[rank[i] - 1];

            while (i + k < n && prevSuffixIdx + k < n && text.charAt(i + k) == text.charAt(prevSuffixIdx + k)) {
                k++;
            }

            lcp[rank[i]] = k;

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("LCP_COMPUTE")
                    .description("LCP for Suffix Rank " + rank[i] + " (\"" + (suffixList.get(rank[i]).suffix.length() > 15 ? suffixList.get(rank[i]).suffix.substring(0, 15) + "..." : suffixList.get(rank[i]).suffix) + "\") with previous Suffix Rank " + (rank[i] - 1) + " -> LCP = " + k)
                    .activeIndices(List.of(rank[i], rank[i] - 1))
                    .arrayState(lcp.clone())
                    .stateMap(Map.of("rank", rank[i], "k", k, "lcp", lcp.clone()))
                    .build());

            if (k > 0) {
                k--;
            }
        }

        // Find Longest Repeated Substring
        int maxLcp = 0;
        int maxLcpIdx = 0;
        for (int i = 1; i < n; i++) {
            if (lcp[i] > maxLcp) {
                maxLcp = lcp[i];
                maxLcpIdx = i;
            }
        }

        String longestRepeatedSubstring = maxLcp > 0 ? text.substring(sa[maxLcpIdx], sa[maxLcpIdx] + maxLcp) : "";

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("LCP_COMPLETE")
                .description("LCP Array completed. Longest Repeated Substring identified: \"" + longestRepeatedSubstring + "\" (Length: " + maxLcp + ")")
                .arrayState(lcp)
                .stateMap(Map.of("maxLcp", maxLcp, "longestRepeated", longestRepeatedSubstring))
                .build());

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("LCP Array (Kasai's Algorithm)")
                .module("M2_SUFFIX")
                .description("Constructs the Longest Common Prefix (LCP) array in linear O(N) time using Rank-inversion decrement property.")
                .financialUseCase("Detecting repeated malicious payload phrases, copy-paste loan contract terms, and recurring cyber attack signatures.")
                .input(Map.of("text", text))
                .result(Map.of(
                        "suffixArray", sa,
                        "lcpArray", lcp,
                        "longestRepeatedSubstring", longestRepeatedSubstring,
                        "maxLcpLength", maxLcp
                ))
                .complexity(Map.of(
                        "time", "O(N)",
                        "space", "O(N)",
                        "comparisons", "<= 2N"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("LCP array generated in O(N) time. Longest repeated phrase: \"" + longestRepeatedSubstring + "\"")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
