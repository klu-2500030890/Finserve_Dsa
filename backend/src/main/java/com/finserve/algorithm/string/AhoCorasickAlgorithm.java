package com.finserve.algorithm.string;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class AhoCorasickAlgorithm {

    public static class TrieNode {
        public int id;
        public Map<Character, TrieNode> children = new TreeMap<>();
        public TrieNode failureLink = null;
        public List<String> output = new ArrayList<>();
        public char charToParent = ' ';
        public int parentId = -1;

        public TrieNode(int id) {
            this.id = id;
        }
    }

    public AlgorithmResponse execute(String text, List<String> patterns) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (patterns == null || patterns.isEmpty()) {
            patterns = List.of("fraud", "otp", "blocked", "stolen", "unauthorized", "phishing");
        }
        if (text == null || text.isEmpty()) {
            text = "TRANSFER 50000 REQ OTP VERIFICATION FRAUD DETECTED ON STOLEN CARD BLOCKED";
        }

        int nodeIdCounter = 0;
        TrieNode root = new TrieNode(nodeIdCounter++);
        root.failureLink = root;

        // Step 1: Build Trie
        for (String pat : patterns) {
            TrieNode curr = root;
            for (char ch : pat.toLowerCase().toCharArray()) {
                if (!curr.children.containsKey(ch)) {
                    TrieNode newNode = new TrieNode(nodeIdCounter++);
                    newNode.charToParent = ch;
                    newNode.parentId = curr.id;
                    curr.children.put(ch, newNode);
                }
                curr = curr.children.get(ch);
            }
            curr.output.add(pat);
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("TRIE_CONSTRUCTED")
                .description("Constructed Prefix Trie with " + nodeIdCounter + " nodes for keywords: " + patterns)
                .highlightNodes(List.of("0"))
                .stateMap(Map.of("phase", "TRIE_BUILD", "nodeCount", nodeIdCounter, "patterns", patterns))
                .build());

        // Step 2: Build Failure Links via BFS
        Queue<TrieNode> queue = new LinkedList<>();
        for (TrieNode child : root.children.values()) {
            child.failureLink = root;
            queue.add(child);
        }

        while (!queue.isEmpty()) {
            TrieNode current = queue.poll();

            for (Map.Entry<Character, TrieNode> entry : current.children.entrySet()) {
                char ch = entry.getKey();
                TrieNode child = entry.getValue();

                TrieNode fail = current.failureLink;
                while (fail != root && !fail.children.containsKey(ch)) {
                    fail = fail.failureLink;
                }

                if (fail.children.containsKey(ch) && fail.children.get(ch) != child) {
                    child.failureLink = fail.children.get(ch);
                } else {
                    child.failureLink = root;
                }

                // Merge output patterns
                child.output.addAll(child.failureLink.output);
                queue.add(child);
            }
        }

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("FAILURE_LINKS_BUILT")
                .description("Computed BFS Failure Links and Output Dictionaries across all automaton states.")
                .highlightNodes(List.of("0"))
                .stateMap(Map.of("phase", "AUTOMATON_READY", "status", "FAILURE_LINKS_RESOLVED"))
                .build());

        // Step 3: Stream text matching
        List<Map<String, Object>> detectedFraudEvents = new ArrayList<>();
        TrieNode current = root;
        String lowerText = text.toLowerCase();

        for (int i = 0; i < lowerText.length(); i++) {
            char ch = lowerText.charAt(i);

            while (current != root && !current.children.containsKey(ch)) {
                current = current.failureLink;
            }

            if (current.children.containsKey(ch)) {
                current = current.children.get(ch);
            } else {
                current = root;
            }

            List<String> hits = current.output;
            if (!hits.isEmpty()) {
                for (String hit : hits) {
                    int startIdx = i - hit.length() + 1;
                    Map<String, Object> hitInfo = new HashMap<>();
                    hitInfo.put("pattern", hit);
                    hitInfo.put("startIndex", startIdx);
                    hitInfo.put("endIndex", i);
                    hitInfo.put("severity", hit.equals("stolen") || hit.equals("unauthorized") || hit.equals("fraud") ? "CRITICAL" : "HIGH");
                    hitInfo.put("nodeId", current.id);
                    detectedFraudEvents.add(hitInfo);
                }

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("FRAUD_PATTERN_HIT")
                        .description("🚨 FRAUD ALERT! Matched pattern(s) " + hits + " at character position " + i + " ('" + ch + "') -> Automaton State #" + current.id)
                        .activeIndices(List.of(i))
                        .highlightNodes(List.of(String.valueOf(current.id)))
                        .stateMap(Map.of("streamIndex", i, "matchedChar", String.valueOf(ch), "patterns", hits, "nodeId", current.id, "alert", true))
                        .build());
            } else {
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("STREAM_SCAN")
                        .description("Scanning char '" + ch + "' (index " + i + ") -> Transitioned to Node #" + current.id)
                        .activeIndices(List.of(i))
                        .highlightNodes(List.of(String.valueOf(current.id)))
                        .stateMap(Map.of("streamIndex", i, "char", String.valueOf(ch), "nodeId", current.id))
                        .build());
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Aho-Corasick Multi-Pattern Automaton")
                .module("M1_STRING")
                .description("Constructs a Trie with BFS failure transitions to locate multiple fraud keywords in O(N + M + Z) streaming time.")
                .financialUseCase("Simultaneous multi-keyword fraud pattern scanning across continuous high-throughput banking transaction feeds.")
                .input(Map.of("text", text, "patterns", patterns))
                .result(Map.of(
                        "totalHits", detectedFraudEvents.size(),
                        "detectedPatterns", detectedFraudEvents,
                        "uniquePatternsFound", detectedFraudEvents.stream().map(d -> d.get("pattern")).distinct().toList(),
                        "automatonNodeCount", nodeIdCounter
                ))
                .complexity(Map.of(
                        "trieConstruction", "O(sum(M_i))",
                        "streamSearch", "O(N + Z)",
                        "space", "O(sum(M_i) * Sigma)",
                        "overallTime", "O(N + sum(M_i) + Z)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Multi-pattern scan complete. Found " + detectedFraudEvents.size() + " fraud indicator occurrences.")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
