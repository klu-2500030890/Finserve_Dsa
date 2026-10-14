package com.finserve.algorithm.randomized;

import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.AlgorithmStep;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.util.*;

@Component
public class MillerRabinAlgorithm {

    public AlgorithmResponse execute(long n, int kRounds) {
        long startNs = System.nanoTime();
        List<AlgorithmStep> steps = new ArrayList<>();

        if (n <= 1) n = 1000000007L;
        if (kRounds <= 0) kRounds = 5;

        boolean isPrime = true;
        String reason = "";

        if (n == 2 || n == 3) {
            isPrime = true;
            reason = "Small prime";
        } else if (n % 2 == 0) {
            isPrime = false;
            reason = "Even number > 2 (Divisible by 2)";
        } else {
            // Factor n - 1 = 2^s * d where d is odd
            long d = n - 1;
            int s = 0;
            while (d % 2 == 0) {
                d /= 2;
                s++;
            }

            steps.add(AlgorithmStep.builder()
                    .stepNumber(steps.size() + 1)
                    .type("FACTOR_DECOMPOSITION")
                    .description("Factored (n - 1) = (" + (n - 1) + ") as 2^" + s + " × " + d + " (s = " + s + ", d = " + d + ")")
                    .stateMap(Map.of("n", n, "s", s, "d", d))
                    .build());

            Random rand = new Random();
            for (int round = 1; round <= kRounds; round++) {
                // Pick random base a in [2, n - 2]
                long a = 2 + (long) (rand.nextDouble() * (n - 4));
                long x = powerMod(a, d, n);

                steps.add(AlgorithmStep.builder()
                        .stepNumber(steps.size() + 1)
                        .type("ROUND_TEST")
                        .description("Round #" + round + ": Chosen witness base a = " + a + ". Computed a^d mod n = " + x)
                        .stateMap(Map.of("round", round, "baseA", a, "initialX", x))
                        .build());

                if (x == 1 || x == n - 1) {
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("WITNESS_PASS")
                            .description("Round #" + round + ": x == 1 or n-1. Base a=" + a + " passed Fermat condition.")
                            .stateMap(Map.of("round", round, "passed", true))
                            .build());
                    continue;
                }

                boolean compositeFound = true;
                for (int r = 1; r < s; r++) {
                    x = (BigInteger.valueOf(x).multiply(BigInteger.valueOf(x)).mod(BigInteger.valueOf(n))).longValue();
                    if (x == n - 1) {
                        compositeFound = false;
                        steps.add(AlgorithmStep.builder()
                                .stepNumber(steps.size() + 1)
                                .type("SQUARE_ROOT_PASS")
                                .description("Round #" + round + ": Squared x at step r=" + r + " reached (n - 1). Passed.")
                                .stateMap(Map.of("round", round, "r", r, "val", x))
                                .build());
                        break;
                    }
                }

                if (compositeFound) {
                    isPrime = false;
                    reason = "Base a=" + a + " is a non-trivial witness proving " + n + " is COMPOSITE.";
                    steps.add(AlgorithmStep.builder()
                            .stepNumber(steps.size() + 1)
                            .type("COMPOSITE_PROVEN")
                            .description("🚨 Base a=" + a + " proves that " + n + " is COMPOSITE (Not Prime).")
                            .stateMap(Map.of("witness", a, "composite", true))
                            .build());
                    break;
                }
            }
        }

        long endNs = System.nanoTime();
        double elapsedMs = (endNs - startNs) / 1_000_000.0;
        double errorProbability = isPrime ? Math.pow(0.25, kRounds) : 0.0;

        return AlgorithmResponse.builder()
                .algorithm("Miller-Rabin Primality Test")
                .module("M6_RANDOM_PARALLEL")
                .description("Monte Carlo randomized primality testing algorithm with error probability bounded by (1/4)^k for k witness rounds.")
                .financialUseCase("Generating secure RSA-4096 / ECC prime keys for encrypted banking transactions, digital signatures, and tokenized settlement.")
                .input(Map.of("candidateNumber", n, "witnessRounds", kRounds))
                .result(Map.of(
                        "isPrime", isPrime,
                        "verdict", isPrime ? "PROBABLY PRIME (Confidence: " + (100.0 * (1.0 - errorProbability)) + "%)" : "DEFINITELY COMPOSITE",
                        "errorProbabilityBound", errorProbability,
                        "roundsExecuted", kRounds,
                        "details", reason.isEmpty() ? "Passed all " + kRounds + " random witness rounds" : reason
                ))
                .complexity(Map.of(
                        "timeComplexity", "O(k * log^3 N)",
                        "spaceComplexity", "O(log N)",
                        "errorBound", "<= (1/4)^k"
                ))
                .steps(steps)
                .executionTimeMs(elapsedMs)
                .executionTimeNs(endNs - startNs)
                .status("SUCCESS")
                .message("Miller-Rabin verdict for " + n + ": " + (isPrime ? "PROBABLY PRIME" : "COMPOSITE"))
                .timestamp(System.currentTimeMillis())
                .build();
    }

    private long powerMod(long base, long exp, long mod) {
        BigInteger b = BigInteger.valueOf(base);
        BigInteger e = BigInteger.valueOf(exp);
        BigInteger m = BigInteger.valueOf(mod);
        return b.modPow(e, m).longValue();
    }
}
