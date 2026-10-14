package com.finserve.algorithm.randomized;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ReservoirSamplingAlgorithm {

    public AlgorithmResponse execute(int sampleSizeK, List<Map<String, Object>> streamItems) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (sampleSizeK <= 0) sampleSizeK = 5;

        if (streamItems == null || streamItems.isEmpty()) {
            streamItems = new ArrayList<>();
            String[] types = {"UPI_PAYMENT", "NEFT_TRANSFER", "ATM_WITHDRAWAL", "SWIFT_WIRE", "POS_PURCHASE", "REFUND", "SETTLEMENT"};
            for (int i = 1; i <= 20; i++) {
                streamItems.add(Map.of(
                        "id", "TXN-" + (1000 + i),
                        "amount", 1000 + (i * 4500) % 95000,
                        "type", types[i % types.length],
                        "customer", "Cust-" + (100 + (i % 8))
                ));
            }
        }

        int n = streamItems.size();
        List<Map<String, Object>> reservoir = new ArrayList<>();

        // Step 1: Fill the reservoir with the first k items
        for (int i = 0; i < Math.min(sampleSizeK, n); i++) {
            reservoir.add(streamItems.get(i));
            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("RESERVOIR_FILL")
                    .description("Initial fill: Added item #" + (i + 1) + " (" + streamItems.get(i).get("id") + ") directly into Reservoir Slot [" + i + "].")
                    .activeIndices(List.of(i))
                    .stateMap(Map.of("itemIndex", i + 1, "reservoirSize", reservoir.size(), "item", streamItems.get(i)))
                    .build());
        }

        // Step 2: For remaining items i from k to n-1, pick random j in [0, i]. If j < k, replace reservoir[j]
        Random rand = new Random();
        int replacementCount = 0;

        for (int i = sampleSizeK; i < n; i++) {
            int j = rand.nextInt(i + 1); // random in [0..i]
            Map<String, Object> incoming = streamItems.get(i);

            if (j < sampleSizeK) {
                replacementCount++;
                Map<String, Object> replaced = reservoir.set(j, incoming);
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("RESERVOIR_REPLACE")
                        .description("Stream Item #" + (i + 1) + " (" + incoming.get("id") + ") generated random index j=" + j + " < k=" + sampleSizeK + " (Prob = " + sampleSizeK + "/" + (i + 1) + "). REPLACED " + replaced.get("id") + " at slot " + j + "!")
                        .activeIndices(List.of(j))
                        .stateMap(Map.of("itemIndex", i + 1, "chosenSlot", j, "incomingItem", incoming, "replacedItem", replaced))
                        .build());
            } else {
                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("RESERVOIR_DISCARD")
                        .description("Stream Item #" + (i + 1) + " (" + incoming.get("id") + ") generated random index j=" + j + " >= k=" + sampleSizeK + ". Discarded (Skipped).")
                        .stateMap(Map.of("itemIndex", i + 1, "chosenSlot", j, "discarded", true))
                        .build());
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;

        return AlgorithmResponse.builder()
                .algorithm("Reservoir Sampling (Algorithm R)")
                .module("M6_RANDOM_PARALLEL")
                .description("Randomized streaming algorithm maintaining a uniform sample of size k from a stream of unknown length N with exact equal probability k/N.")
                .financialUseCase("Unbiased real-time transaction sampling and continuous risk auditing across high-throughput live payment pipes.")
                .input(Map.of("sampleSizeK", sampleSizeK, "totalStreamCount", n))
                .result(Map.of(
                        "sampleSize", sampleSizeK,
                        "streamSize", n,
                        "finalReservoir", reservoir,
                        "replacementsPerformed", replacementCount,
                        "selectionProbabilityPerItem", (double) sampleSizeK / n
                ))
                .complexity(Map.of(
                        "timeComplexity", "O(N) One Single Pass",
                        "spaceComplexity", "O(k) in memory",
                        "uniformityProof", "Pr(Item in reservoir) = k/N for all items"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Uniform reservoir of " + reservoir.size() + " transactions extracted from " + n + " stream items.")
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
