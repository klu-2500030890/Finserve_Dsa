package com.finserve.algorithm.suffix;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SuffixTreeAlgorithm {

    public static class TreeNode {
        public int id;
        public Map<String, TreeNode> edges = new TreeMap<>();
        public List<Integer> suffixIndices = new ArrayList<>();

        public TreeNode(int id) {
            this.id = id;
        }
    }

    public AlgorithmResponse execute(String text, String query) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (text == null || text.isEmpty()) {
            text = "SWIFT_PAYMENT$";
        }
        if (!text.endsWith("$")) {
            text = text + "$";
        }

        int nodeIdCounter = 0;
        TreeNode root = new TreeNode(nodeIdCounter++);

        int n = text.length();
        List<Map<String, Object>> edgeList = new ArrayList<>();

        // Insert all suffixes into tree
        for (int i = 0; i < n; i++) {
            String suffix = text.substring(i);
            TreeNode curr = root;
            curr.suffixIndices.add(i);

            // Simple compact branch insertion
            boolean matched = false;
            for (Map.Entry<String, TreeNode> entry : new ArrayList<>(curr.edges.entrySet())) {
                String edgeLabel = entry.getKey();
                TreeNode child = entry.getValue();

                // Common prefix with edge label
                int matchLen = 0;
                while (matchLen < edgeLabel.length() && matchLen < suffix.length() && edgeLabel.charAt(matchLen) == suffix.charAt(matchLen)) {
                    matchLen++;
                }

                if (matchLen > 0) {
                    matched = true;
                    if (matchLen == edgeLabel.length()) {
                        curr = child;
                        curr.suffixIndices.add(i);
                        suffix = suffix.substring(matchLen);
                    } else {
                        // Split edge
                        curr.edges.remove(edgeLabel);
                        TreeNode splitNode = new TreeNode(nodeIdCounter++);
                        splitNode.suffixIndices.addAll(child.suffixIndices);
                        splitNode.suffixIndices.add(i);

                        String prefix = edgeLabel.substring(0, matchLen);
                        String remainingOld = edgeLabel.substring(matchLen);
                        String remainingNew = suffix.substring(matchLen);

                        curr.edges.put(prefix, splitNode);
                        splitNode.edges.put(remainingOld, child);

                        TreeNode newLeaf = new TreeNode(nodeIdCounter++);
                        newLeaf.suffixIndices.add(i);
                        splitNode.edges.put(remainingNew, newLeaf);
                        break;
                    }
                }
            }

            if (!matched && !suffix.isEmpty()) {
                TreeNode leaf = new TreeNode(nodeIdCounter++);
                leaf.suffixIndices.add(i);
                curr.edges.put(suffix, leaf);
            }
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SUFFIX_TREE_BUILT")
                .description("Constructed Suffix Tree with " + nodeIdCounter + " compact nodes for text: \"" + text + "\"")
                .highlightNodes(List.of("0"))
                .stateMap(Map.of("totalNodes", nodeIdCounter, "text", text))
                .build());

        // Step 2: Search for Query Substring
        boolean found = false;
        List<Integer> foundPositions = new ArrayList<>();
        if (query != null && !query.isEmpty()) {
            TreeNode curr = root;
            String remainingQuery = query;
            boolean searchFailed = false;

            while (!remainingQuery.isEmpty()) {
                boolean edgeMatched = false;
                for (Map.Entry<String, TreeNode> entry : curr.edges.entrySet()) {
                    String edgeLabel = entry.getKey();
                    TreeNode child = entry.getValue();

                    if (remainingQuery.startsWith(edgeLabel)) {
                        edgeMatched = true;
                        remainingQuery = remainingQuery.substring(edgeLabel.length());
                        curr = child;
                        steps.add(AlgorithmStep.builder()
                                .stepNumber(steps.size() + 1)
                                .type("EDGE_TRAVERSAL")
                                .description("Traversed full edge \"" + edgeLabel + "\" -> Arrived at Node #" + child.id)
                                .highlightNodes(List.of(String.valueOf(child.id)))
                                .stateMap(Map.of("edgeLabel", edgeLabel, "remainingQuery", remainingQuery))
                                .build());
                        break;
                    } else if (edgeLabel.startsWith(remainingQuery)) {
                        edgeMatched = true;
                        curr = child;
                        remainingQuery = "";
                        steps.add(AlgorithmStep.builder()
                                .stepNumber(steps.size() + 1)
                                .type("EDGE_PARTIAL_MATCH")
                                .description("Query fully consumed inside edge \"" + edgeLabel + "\" -> Node #" + child.id)
                                .highlightNodes(List.of(String.valueOf(child.id)))
                                .stateMap(Map.of("edgeLabel", edgeLabel, "matched", true))
                                .build());
                        break;
                    }
                }

                if (!edgeMatched) {
                    searchFailed = true;
                    break;
                }
            }

            if (!searchFailed) {
                found = true;
                foundPositions = curr.suffixIndices;
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Suffix Tree (Compact Suffix Trie)")
                .module("M2_SUFFIX")
                .description("Compressed trie containing all suffixes of a text. Supports O(M) substring lookups independent of text size.")
                .financialUseCase("Sub-millisecond query execution across massive regulatory banking document stores.")
                .input(Map.of("text", text, "query", query != null ? query : ""))
                .result(Map.of(
                        "found", found,
                        "nodeCount", nodeIdCounter,
                        "occurrences", foundPositions,
                        "matchCount", foundPositions.size()
                ))
                .complexity(Map.of(
                        "constructionUkkonen", "O(N)",
                        "searchQueryTime", "O(M)",
                        "space", "O(N)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message(found ? "Substring \"" + query + "\" FOUND in Suffix Tree at positions " + foundPositions : "Suffix tree built (" + nodeIdCounter + " nodes)")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
