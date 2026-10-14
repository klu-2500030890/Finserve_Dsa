package com.finserve.algorithm.parallel;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class BrentTheoremCalculator {

    public AlgorithmResponse execute(int workW, int spanS, int maxProcessorsP) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (workW <= 0) workW = 10000;
        if (spanS <= 0) spanS = 100;
        if (maxProcessorsP <= 0) maxProcessorsP = 16;

        List<Map<String, Object>> scalingCurve = new ArrayList<>();

        steps.add(AlgorithmStep.builder()
                .stepNumber(steps.size() + 1)
                .type("BRENT_THEOREM_INIT")
                .description("Initialized Brent's Scheduling Theorem analysis for Work W = " + workW + " operations and Span S = " + spanS + " steps. Bound: T_p <= W/P + S")
                .stateMap(Map.of("workW", workW, "spanS", spanS, "maxProcessors", maxProcessorsP))
                .build());

        for (int p = 1; p <= maxProcessorsP; p *= 2) {
            double tpBound = (double) workW / p + spanS;
            double speedup = (double) workW / tpBound;
            double efficiency = speedup / p;

            Map<String, Object> point = new HashMap<>();
            point.put("processorsP", p);
            point.put("theoreticalTimeTp", tpBound);
            point.put("speedup", speedup);
            point.put("efficiencyPercent", efficiency * 100.0);
            scalingCurve.add(point);

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("PROCESSOR_EVAL")
                    .description("P = " + p + " Processors -> Bound T_p <= " + String.format("%.1f", tpBound) + " steps (Speedup: " + String.format("%.2fx", speedup) + ", Efficiency: " + String.format("%.1f%%", efficiency * 100.0) + ")")
                    .stateMap(point)
                    .build());
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Brent's Theorem Parallel Scheduler")
                .module("M6_RANDOM_PARALLEL")
                .description("Fundamental parallel computing theorem establishing that an algorithm with work W and span S can be scheduled on P processors in time T_p <= W/P + S.")
                .financialUseCase("Determining optimal cluster compute provisioning for risk portfolio valuation avoiding diminishing multi-core returns.")
                .input(Map.of("totalWorkW", workW, "criticalSpanS", spanS, "maxProcessorsP", maxProcessorsP))
                .result(Map.of(
                        "formula", "T_p <= W / P + S",
                        "scalingCurve", scalingCurve,
                        "idealParallelism", (double) workW / spanS,
                        "asymptoticBound", "As P -> inf, T_p -> S"
                ))
                .complexity(Map.of(
                        "workLaw", "T_p >= W / P",
                        "spanLaw", "T_p >= S",
                        "brentBound", "T_p <= W / P + S"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Brent's Theorem analysis generated for W=" + workW + ", S=" + spanS)
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
