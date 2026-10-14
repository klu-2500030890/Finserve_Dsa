package com.finserve.algorithm.graph;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DinicAlgorithm {

    public static class Edge {
        public int to;
        public int flow;
        public int cap;
        public int rev;

        public Edge(int to, int cap, int rev) {
            this.to = to;
            this.cap = cap;
            this.flow = 0;
            this.rev = rev;
        }
    }

    public AlgorithmResponse execute(int[][] capacity, String[] nodeNames, int source, int sink) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (nodeNames == null || nodeNames.length == 0) {
            nodeNames = new String[]{"Origin Bank", "Layer 1 Gateway A", "Layer 1 Gateway B", "Layer 2 Switch A", "Layer 2 Switch B", "Central Reserve Sink"};
        }
        int n = nodeNames.length;
        if (capacity == null || capacity.length != n) {
            capacity = new int[][]{
                    {0, 10, 10, 0, 0, 0},
                    {0, 0, 2, 4, 8, 0},
                    {0, 0, 0, 0, 9, 0},
                    {0, 0, 0, 0, 0, 10},
                    {0, 0, 0, 6, 0, 10},
                    {0, 0, 0, 0, 0, 0}
            };
        }
        if (source < 0 || source >= n) source = 0;
        if (sink < 0 || sink >= n) sink = n - 1;

        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

        for (int u = 0; u < n; u++) {
            for (int v = 0; v < n; v++) {
                if (capacity[u][v] > 0) {
                    Edge a = new Edge(v, capacity[u][v], adj.get(v).size());
                    Edge b = new Edge(u, 0, adj.get(u).size());
                    adj.get(u).add(a);
                    adj.get(v).add(b);
                }
            }
        }

        int[] level = new int[n];
        int maxFlow = 0;
        int phase = 0;

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("DINIC_INIT")
                .description("Initialized Dinic's Algorithm for " + n + " nodes. Source: " + nodeNames[source] + ", Sink: " + nodeNames[sink])
                .stateMap(Map.of("source", nodeNames[source], "sink", nodeNames[sink], "totalNodes", n))
                .build());

        while (bfsLevelGraph(adj, source, sink, level, n)) {
            phase++;
            int[] ptr = new int[n];

            List<Integer> levelList = new ArrayList<>();
            for (int l : level) levelList.add(l);

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("LEVEL_GRAPH_BUILT")
                    .description("Phase #" + phase + ": BFS constructed Layered Level Graph. Sink distance level = " + level[sink])
                    .arrayState(levelList)
                    .stateMap(Map.of("phase", phase, "levels", levelList, "sinkLevel", level[sink]))
                    .build());

            while (true) {
                int pushed = dfsBlockingFlow(adj, ptr, level, source, sink, Integer.MAX_VALUE);
                if (pushed <= 0) break;
                maxFlow += pushed;

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("BLOCKING_FLOW_PUSHED")
                        .description("Pushed Blocking Flow = " + pushed + " Lakhs in Phase #" + phase + ". Cumulative Max Flow = " + maxFlow + " Lakhs")
                        .stateMap(Map.of("pushed", pushed, "currentMaxFlow", maxFlow, "phase", phase))
                        .build());
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Dinic's Algorithm (Layered Blocking Flow)")
                .module("M4_FLOW")
                .description("Computes maximum network flow in O(V^2 E) time using BFS Level Graphs and DFS Blocking Flows.")
                .financialUseCase("Ultra-fast settlement network throughput routing and clearing large volumes of simultaneous transactions across hierarchical financial tiers.")
                .input(Map.of("nodes", nodeNames, "source", nodeNames[source], "sink", nodeNames[sink]))
                .result(Map.of(
                        "maxFlow", maxFlow,
                        "totalPhases", phase,
                        "source", nodeNames[source],
                        "sink", nodeNames[sink]
                ))
                .complexity(Map.of(
                        "generalGraph", "O(V^2 * E)",
                        "unitNetwork", "O(E * sqrt(V))",
                        "bipartiteMatching", "O(E * sqrt(V))"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Dinic's Algorithm solved Max Flow = " + maxFlow + " Lakhs across " + phase + " layered phases.")
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private boolean bfsLevelGraph(List<List<Edge>> adj, int s, int t, int[] level, int n) {
        Arrays.fill(level, -1);
        level[s] = 0;
        Queue<Integer> q = new LinkedList<>();
        q.add(s);

        while (!q.isEmpty()) {
            int v = q.poll();
            for (Edge edge : adj.get(v)) {
                if (edge.cap - edge.flow > 0 && level[edge.to] == -1) {
                    level[edge.to] = level[v] + 1;
                    q.add(edge.to);
                }
            }
        }
        return level[t] != -1;
    }

    private int dfsBlockingFlow(List<List<Edge>> adj, int[] ptr, int[] level, int v, int t, int pushed) {
        if (pushed == 0 || v == t) return pushed;

        for (int cid = ptr[v]; cid < adj.get(v).size(); ++cid) {
            ptr[v] = cid;
            Edge edge = adj.get(v).get(cid);
            int tr = edge.to;

            if (level[v] + 1 != level[tr] || edge.cap - edge.flow == 0) continue;

            int trPushed = dfsBlockingFlow(adj, ptr, level, tr, t, Math.min(pushed, edge.cap - edge.flow));
            if (trPushed == 0) continue;

            edge.flow += trPushed;
            adj.get(tr).get(edge.rev).flow -= trPushed;
            return trPushed;
        }
        return 0;
    }
}
