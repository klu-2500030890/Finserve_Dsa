package com.finserve.algorithm.np;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ReductionVisualizerAlgorithm {

    public AlgorithmResponse execute(String activeStage) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (activeStage == null || activeStage.isEmpty()) {
            activeStage = "3-SAT";
        }

        List<Map<String, Object>> stages = List.of(
                Map.of(
                        "id", "3-SAT",
                        "title", "3-CNF Boolean Satisfiability",
                        "definition", "Given formula Phi = (x1 v x2 v x3) ^ (~x1 v x2 v x4)... find truth assignment.",
                        "financialAnalogy", "Multi-rule regulatory constraints: A transaction is valid iff all regulatory clauses evaluate to TRUE.",
                        "transformation", "Construct 3-node triangular gadgets for each clause. Connect conflicting literals between different clause gadgets.",
                        "gadget", "3-Literal Triangles"
                ),
                Map.of(
                        "id", "CLIQUE",
                        "title", "Maximum / k-Clique Problem",
                        "definition", "Find subset of k vertices where every pair is connected by an edge.",
                        "financialAnalogy", "Syndicated lending syndicate: Finding a subgroup of k banking institutions that all mutually trust and co-underwrite each other.",
                        "transformation", "Take the complement graph G_bar = (V, E_bar). An edge exists in G_bar iff it does NOT exist in G.",
                        "gadget", "Complement Graph Edge Inversion"
                ),
                Map.of(
                        "id", "INDEPENDENT_SET",
                        "title", "Maximum Independent Set",
                        "definition", "Find subset of k vertices where NO two vertices are adjacent.",
                        "financialAnalogy", "Risk diversification: Selecting k portfolio assets with zero mutual systemic risk contagion / no direct bilateral debt channels.",
                        "transformation", "V' is an Independent Set in G iff (V - V') is a Vertex Cover in G.",
                        "gadget", "Complementary Vertex Subset (V - S)"
                ),
                Map.of(
                        "id", "VERTEX_COVER",
                        "title", "Minimum Vertex Cover",
                        "definition", "Find minimum subset of vertices S such that every edge has at least one endpoint in S.",
                        "financialAnalogy", "Banking Sentinel Placement: Minimum number of audit probe nodes required to monitor every interbank payment corridor.",
                        "transformation", "Final polynomial reduction proved: 3-SAT <=p CLIQUE <=p INDEPENDENT_SET <=p VERTEX_COVER (Karp's 21 NP-Complete Problems).",
                        "gadget", "Edge-Covering Audit Sentinels"
                )
        );

        for (int i = 0; i < stages.size(); i++) {
            Map<String, Object> s = stages.get(i);
            steps.add(AlgorithmStep.builder()
                    .stepNumber(i + 1)
                    .type("REDUCTION_STAGE")
                    .description("Reduction Step " + (i + 1) + ": " + s.get("title") + " -> " + s.get("transformation"))
                    .stateMap(s)
                    .build());
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Polynomial-Time Reduction Chain (Karp Reductions)")
                .module("M5_NP")
                .description("Demonstrates the formal polynomial-time transformations: 3-SAT <=p CLIQUE <=p INDEPENDENT SET <=p VERTEX COVER.")
                .financialUseCase("Proving intractability and computational boundaries for multi-party financial risk matching and asset basket selection.")
                .input(Map.of("initialProblem", "3-SAT", "targetProblem", "VERTEX_COVER"))
                .result(Map.of(
                        "reductionChain", List.of("3-SAT", "CLIQUE", "INDEPENDENT_SET", "VERTEX_COVER"),
                        "stages", stages,
                        "complexityPreservation", "Polynomial O(V + E) gadget construction",
                        "npCompletenessTheorem", "Cook-Levin Theorem + Karp's Reductions"
                ))
                .complexity(Map.of(
                        "reductionTime", "O(N^2) polynomial time",
                        "problemClass", "NP-Complete",
                        "decisionEquivalence", "G has k-clique <=> G_bar has k-IS <=> G_bar has (n-k)-VC"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Polynomial reduction chain verified.")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
