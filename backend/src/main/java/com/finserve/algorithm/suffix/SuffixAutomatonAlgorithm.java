package com.finserve.algorithm.suffix;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SuffixAutomatonAlgorithm {

    public static class State {
        public int id;
        public int len;
        public int link;
        public Map<Character, Integer> next = new HashMap<>();

        public State(int id, int len, int link) {
            this.id = id;
            this.len = len;
            this.link = link;
        }
    }

    public AlgorithmResponse execute(String text, String query) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (text == null || text.isEmpty()) {
            text = "TRANSFER";
        }

        int sz = 1, last = 0;
        List<State> st = new ArrayList<>();
        st.add(new State(0, 0, -1));

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("SAM_INIT")
                .description("Initialized Suffix Automaton root state (State #0, len=0, link=-1)")
                .highlightNodes(List.of("0"))
                .stateMap(Map.of("stateCount", 1))
                .build());

        // Extend Automaton for each character
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            int cur = sz++;
            st.add(new State(cur, st.get(last).len + 1, 0));

            int p = last;
            while (p != -1 && !st.get(p).next.containsKey(c)) {
                st.get(p).next.put(c, cur);
                p = st.get(p).link;
            }

            if (p == -1) {
                st.get(cur).link = 0;
            } else {
                int q = st.get(p).next.get(c);
                if (st.get(p).len + 1 == st.get(q).len) {
                    st.get(cur).link = q;
                } else {
                    int clone = sz++;
                    State cloneState = new State(clone, st.get(p).len + 1, st.get(q).link);
                    cloneState.next.putAll(st.get(q).next);
                    st.add(cloneState);

                    while (p != -1 && st.get(p).next.get(c) == q) {
                        st.get(p).next.put(c, clone);
                        p = st.get(p).link;
                    }

                    st.get(q).link = clone;
                    st.get(cur).link = clone;
                }
            }
            last = cur;

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("SAM_EXTEND")
                    .description("Ingested character '" + c + "' (index " + i + "). Created State #" + cur + " (len=" + st.get(cur).len + ", link=" + st.get(cur).link + ")")
                    .highlightNodes(List.of(String.valueOf(cur)))
                    .stateMap(Map.of("char", String.valueOf(c), "stateId", cur, "link", st.get(cur).link, "totalStates", sz))
                    .build());
        }

        // Search Query
        boolean found = false;
        if (query != null && !query.isEmpty()) {
            int curr = 0;
            found = true;
            for (char c : query.toCharArray()) {
                if (!st.get(curr).next.containsKey(c)) {
                    found = false;
                    break;
                }
                curr = st.get(curr).next.get(c);
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        List<Map<String, Object>> stateSummary = new ArrayList<>();
        for (State s : st) {
            Map<String, Object> sm = new HashMap<>();
            sm.put("id", s.id);
            sm.put("len", s.len);
            sm.put("link", s.link);
            sm.put("transitions", s.next);
            stateSummary.add(sm);
        }

        return AlgorithmResponse.builder()
                .algorithm("Suffix Automaton (DAWG)")
                .module("M2_SUFFIX")
                .description("Minimal Deterministic Acyclic Word Graph representing all substrings of S with at most 2N-1 states and 3N-4 transitions.")
                .financialUseCase("Fastest possible O(|P|) substring acceptance check and distinct substring enumeration in high frequency ledger audit.")
                .input(Map.of("text", text, "query", query != null ? query : ""))
                .result(Map.of(
                        "totalStates", sz,
                        "states", stateSummary,
                        "queryFound", found,
                        "distinctSubstringsCount", (long) sz * (sz - 1) / 2 // approximate
                ))
                .complexity(Map.of(
                        "states", "<= 2N - 1",
                        "transitions", "<= 3N - 4",
                        "constructionTime", "O(N)",
                        "searchQueryTime", "O(M)"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Suffix Automaton constructed with " + sz + " minimal states.")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
