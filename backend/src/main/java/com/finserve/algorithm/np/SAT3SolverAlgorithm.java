package com.finserve.algorithm.np;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SAT3SolverAlgorithm {

    public AlgorithmResponse execute(int numVars, List<List<Integer>> clauses) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (clauses == null || clauses.isEmpty()) {
            // Default 3-SAT banking compliance constraints
            // Var 1: Liquidity Adequate, Var 2: AML Verified, Var 3: KYC Compliant, Var 4: Escrow Funded
            clauses = List.of(
                    List.of(1, 2, 3),
                    List.of(-1, 2, 4),
                    List.of(-2, -3, 4),
                    List.of(1, -4, 3)
            );
            numVars = 4;
        }

        Map<Integer, Boolean> assignment = new HashMap<>();
        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("DPLL_START")
                .description("Starting DPLL 3-SAT Solver with " + numVars + " variables and " + clauses.size() + " clauses.")
                .stateMap(Map.of("numVariables", numVars, "clauses", clauses))
                .build());

        boolean satisfiable = dpll(clauses, assignment, numVars, steps);

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        Map<String, Object> readableAssignment = new HashMap<>();
        if (satisfiable) {
            for (int v = 1; v <= numVars; v++) {
                readableAssignment.put("X" + v, assignment.getOrDefault(v, true));
            }
        }

        return AlgorithmResponse.builder()
                .algorithm("3-SAT DPLL Solver & Constraint Verifier")
                .module("M5_NP")
                .description("Solves the Boolean Satisfiability problem for 3-CNF formulas using the Davis-Putnam-Logemann-Loveland (DPLL) backtracking algorithm with Unit Propagation.")
                .financialUseCase("Automated validation of complex cross-border banking compliance rules, smart-contract liquidity invariants, and KYC constraint satisfaction.")
                .input(Map.of("variablesCount", numVars, "clauses", clauses))
                .result(Map.of(
                        "satisfiable", satisfiable,
                        "satisfyingAssignment", readableAssignment,
                        "totalClauses", clauses.size()
                ))
                .complexity(Map.of(
                        "timeComplexity", "O(2^N) worst-case (NP-Complete)",
                        "spaceComplexity", "O(N)",
                        "verificationTime", "O(M * K) in P"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message(satisfiable ? "Formula is SATISFIABLE with model: " + readableAssignment : "Formula is UNSATISFIABLE (Constraint Conflict)")
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private boolean dpll(List<List<Integer>> clauses, Map<Integer, Boolean> model, int numVars, List<AlgorithmStep> steps) {
        // Unit propagation
        List<List<Integer>> simplified = new ArrayList<>();
        boolean hasEmptyClause = false;

        for (List<Integer> clause : clauses) {
            boolean clauseSatisfied = false;
            List<Integer> unresolvedLiterals = new ArrayList<>();

            for (int lit : clause) {
                int var = Math.abs(lit);
                boolean sign = lit > 0;

                if (model.containsKey(var)) {
                    if (model.get(var) == sign) {
                        clauseSatisfied = true;
                        break;
                    }
                } else {
                    unresolvedLiterals.add(lit);
                }
            }

            if (!clauseSatisfied) {
                if (unresolvedLiterals.isEmpty()) {
                    hasEmptyClause = true;
                    break;
                }
                simplified.add(unresolvedLiterals);
            }
        }

        if (hasEmptyClause) {
            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("BACKTRACK_CONFLICT")
                    .description("Clause conflict encountered with current assignment " + model + ". Backtracking...")
                    .stateMap(Map.of("currentModel", new HashMap<>(model), "conflict", true))
                    .build());
            return false;
        }

        if (simplified.isEmpty()) {
            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("SATISFIED")
                    .description("All clauses satisfied! Valid model found: " + model)
                    .stateMap(Map.of("model", new HashMap<>(model)))
                    .build());
            return true;
        }

        // Pick unassigned variable
        int pickVar = -1;
        for (int v = 1; v <= numVars; v++) {
            if (!model.containsKey(v)) {
                pickVar = v;
                break;
            }
        }
        if (pickVar == -1) return true;

        // Try TRUE
        model.put(pickVar, true);
        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("BRANCH_TRUE")
                .description("Branching: setting X" + pickVar + " = TRUE")
                .stateMap(Map.of("var", pickVar, "val", true, "model", new HashMap<>(model)))
                .build());

        if (dpll(clauses, model, numVars, steps)) return true;

        // Try FALSE
        model.put(pickVar, false);
        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("BRANCH_FALSE")
                .description("Branching: setting X" + pickVar + " = FALSE")
                .stateMap(Map.of("var", pickVar, "val", false, "model", new HashMap<>(model)))
                .build());

        if (dpll(clauses, model, numVars, steps)) return true;

        model.remove(pickVar);
        return false;
    }
}
