package com.finserve.algorithm.suffix;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SuffixArrayAlgorithm {

    public static class SuffixItem {
        public int index;
        public String suffix;
        public int rank;

        public SuffixItem(int index, String suffix) {
            this.index = index;
            this.suffix = suffix;
        }
    }

    public AlgorithmResponse execute(String text, String query) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (text == null || text.isEmpty()) {
            text = "TRANSFER_NEFT_IMPS_SWIFT$";
        }
        if (!text.endsWith("$")) {
            text = text + "$";
        }

        int n = text.length();
        List<SuffixItem> suffixList = new ArrayList<>();

        // Step 1: Generate all suffixes
        for (int i = 0; i < n; i++) {
            suffixList.add(new SuffixItem(i, text.substring(i)));
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SUFFIX_EXTRACTION")
                .description("Extracted all " + n + " suffixes from input text (terminated with '$')")
                .stateMap(Map.of("phase", "EXTRACTION", "text", text, "suffixCount", n))
                .build());

        // Step 2: Lexicographical Sorting
        suffixList.sort(Comparator.comparing(a -> a.suffix));

        int[] suffixArray = new int[n];
        int[] rankArray = new int[n];
        List<Map<String, Object>> suffixTable = new ArrayList<>();

        for (int rank = 0; rank < n; rank++) {
            SuffixItem item = suffixList.get(rank);
            item.rank = rank;
            suffixArray[rank] = item.index;
            rankArray[item.index] = rank;

            Map<String, Object> row = new HashMap<>();
            row.put("rank", rank);
            row.put("index", item.index);
            row.put("suffix", item.suffix);
            suffixTable.add(row);
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SUFFIX_SORTED")
                .description("Sorted all " + n + " suffixes lexicographically to build Suffix Array: " + Arrays.toString(suffixArray))
                .arrayState(suffixArray)
                .stateMap(Map.of("phase", "SORTED_ARRAY", "suffixArray", suffixArray, "suffixTable", suffixTable))
                .build());

        // Step 3: Binary Search for Query Substring if provided
        List<Integer> matchedOccurrences = new ArrayList<>();
        if (query != null && !query.isEmpty()) {
            int low = 0, high = n - 1;
            int firstMatch = -1;

            while (low <= high) {
                int mid = low + (high - low) / 2;
                String suf = suffixList.get(mid).suffix;
                int cmp = suf.startsWith(query) ? 0 : suf.compareTo(query);

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("BINARY_SEARCH_STEP")
                        .description("Binary search step: mid=" + mid + " (Suffix: \"" + (suf.length() > 20 ? suf.substring(0, 20) + "..." : suf) + "\") vs Query: \"" + query + "\"")
                        .activeIndices(List.of(low, mid, high))
                        .stateMap(Map.of("low", low, "mid", mid, "high", high, "currentSuffix", suf, "query", query))
                        .build());

                if (cmp == 0) {
                    firstMatch = mid;
                    high = mid - 1; // look left
                } else if (cmp < 0) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }

            if (firstMatch != -1) {
                for (int i = firstMatch; i < n; i++) {
                    if (suffixList.get(i).suffix.startsWith(query)) {
                        matchedOccurrences.add(suffixList.get(i).index);
                    } else {
                        break;
                    }
                }
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Suffix Array Construction & Binary Search")
                .module("M2_SUFFIX")
                .description("Constructs the sorted array of all text suffixes to facilitate logarithmic substring search.")
                .financialUseCase("Rapid indexing and substring queries across financial contracts, SWIFT regulatory documents, and AML transaction archives.")
                .input(Map.of("text", text, "query", query != null ? query : ""))
                .result(Map.of(
                        "suffixArray", suffixArray,
                        "rankArray", rankArray,
                        "suffixTable", suffixTable,
                        "queryMatches", matchedOccurrences
                ))
                .complexity(Map.of(
                        "constructionTime", "O(N log^2 N) or O(N)",
                        "binarySearchQueryTime", "O(M log N)",
                        "space", "O(N)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Suffix Array indexed successfully (" + n + " suffixes)")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
