package com.finserve.controller;

import com.finserve.algorithm.dp.*;
import com.finserve.algorithm.graph.*;
import com.finserve.algorithm.np.*;
import com.finserve.algorithm.parallel.*;
import com.finserve.algorithm.randomized.*;
import com.finserve.algorithm.string.*;
import com.finserve.algorithm.suffix.*;
import com.finserve.dto.AlgorithmRequest;
import com.finserve.dto.AlgorithmResponse;
import com.finserve.model.AlgorithmExecution;
import com.finserve.service.AlgorithmExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dsa")
@CrossOrigin(originPatterns = "*")
public class DsaController {

    private final AlgorithmExecutionService executionService;

    // M1: String Algorithms
    private final KMPAlgorithm kmpAlgorithm;
    private final ZFunctionAlgorithm zFunctionAlgorithm;
    private final RabinKarpAlgorithm rabinKarpAlgorithm;
    private final AhoCorasickAlgorithm ahoCorasickAlgorithm;

    // M2: Suffix Structures
    private final SuffixArrayAlgorithm suffixArrayAlgorithm;
    private final SAISAlgorithm saisAlgorithm;
    private final LCPKasaiAlgorithm lcpKasaiAlgorithm;
    private final SuffixTreeAlgorithm suffixTreeAlgorithm;
    private final SuffixAutomatonAlgorithm suffixAutomatonAlgorithm;

    // M3: Dynamic Programming
    private final LevenshteinAlgorithm levenshteinAlgorithm;
    private final DamerauLevenshteinAlgorithm damerauLevenshteinAlgorithm;
    private final WeightedEditDistanceAlgorithm weightedEditDistanceAlgorithm;
    private final BitmaskDPAlgorithm bitmaskDPAlgorithm;
    private final MatrixChainMultiplicationAlgorithm matrixChainAlgorithm;

    // M4: Network Flow
    private final FordFulkersonAlgorithm fordFulkersonAlgorithm;
    private final EdmondsKarpAlgorithm edmondsKarpAlgorithm;
    private final DinicAlgorithm dinicAlgorithm;
    private final BipartiteMatchingAlgorithm bipartiteMatchingAlgorithm;
    private final MinCutAlgorithm minCutAlgorithm;

    // M5: NP & Approximation
    private final SAT3SolverAlgorithm sat3SolverAlgorithm;
    private final ReductionVisualizerAlgorithm reductionVisualizerAlgorithm;
    private final VertexCoverApproximationAlgorithm vertexCoverAlgorithm;

    // M6: Randomized & Parallel
    private final RandomizedQuickSortAlgorithm randomizedQuickSortAlgorithm;
    private final MillerRabinAlgorithm millerRabinAlgorithm;
    private final ReservoirSamplingAlgorithm reservoirSamplingAlgorithm;
    private final BlellochScanAlgorithm blellochScanAlgorithm;
    private final ParallelReduceAlgorithm parallelReduceAlgorithm;
    private final BrentTheoremCalculator brentTheoremCalculator;

    @Autowired
    public DsaController(
            AlgorithmExecutionService executionService,
            KMPAlgorithm kmpAlgorithm,
            ZFunctionAlgorithm zFunctionAlgorithm,
            RabinKarpAlgorithm rabinKarpAlgorithm,
            AhoCorasickAlgorithm ahoCorasickAlgorithm,
            SuffixArrayAlgorithm suffixArrayAlgorithm,
            SAISAlgorithm saisAlgorithm,
            LCPKasaiAlgorithm lcpKasaiAlgorithm,
            SuffixTreeAlgorithm suffixTreeAlgorithm,
            SuffixAutomatonAlgorithm suffixAutomatonAlgorithm,
            LevenshteinAlgorithm levenshteinAlgorithm,
            DamerauLevenshteinAlgorithm damerauLevenshteinAlgorithm,
            WeightedEditDistanceAlgorithm weightedEditDistanceAlgorithm,
            BitmaskDPAlgorithm bitmaskDPAlgorithm,
            MatrixChainMultiplicationAlgorithm matrixChainAlgorithm,
            FordFulkersonAlgorithm fordFulkersonAlgorithm,
            EdmondsKarpAlgorithm edmondsKarpAlgorithm,
            DinicAlgorithm dinicAlgorithm,
            BipartiteMatchingAlgorithm bipartiteMatchingAlgorithm,
            MinCutAlgorithm minCutAlgorithm,
            SAT3SolverAlgorithm sat3SolverAlgorithm,
            ReductionVisualizerAlgorithm reductionVisualizerAlgorithm,
            VertexCoverApproximationAlgorithm vertexCoverAlgorithm,
            RandomizedQuickSortAlgorithm randomizedQuickSortAlgorithm,
            MillerRabinAlgorithm millerRabinAlgorithm,
            ReservoirSamplingAlgorithm reservoirSamplingAlgorithm,
            BlellochScanAlgorithm blellochScanAlgorithm,
            ParallelReduceAlgorithm parallelReduceAlgorithm,
            BrentTheoremCalculator brentTheoremCalculator) {
        this.executionService = executionService;
        this.kmpAlgorithm = kmpAlgorithm;
        this.zFunctionAlgorithm = zFunctionAlgorithm;
        this.rabinKarpAlgorithm = rabinKarpAlgorithm;
        this.ahoCorasickAlgorithm = ahoCorasickAlgorithm;
        this.suffixArrayAlgorithm = suffixArrayAlgorithm;
        this.saisAlgorithm = saisAlgorithm;
        this.lcpKasaiAlgorithm = lcpKasaiAlgorithm;
        this.suffixTreeAlgorithm = suffixTreeAlgorithm;
        this.suffixAutomatonAlgorithm = suffixAutomatonAlgorithm;
        this.levenshteinAlgorithm = levenshteinAlgorithm;
        this.damerauLevenshteinAlgorithm = damerauLevenshteinAlgorithm;
        this.weightedEditDistanceAlgorithm = weightedEditDistanceAlgorithm;
        this.bitmaskDPAlgorithm = bitmaskDPAlgorithm;
        this.matrixChainAlgorithm = matrixChainAlgorithm;
        this.fordFulkersonAlgorithm = fordFulkersonAlgorithm;
        this.edmondsKarpAlgorithm = edmondsKarpAlgorithm;
        this.dinicAlgorithm = dinicAlgorithm;
        this.bipartiteMatchingAlgorithm = bipartiteMatchingAlgorithm;
        this.minCutAlgorithm = minCutAlgorithm;
        this.sat3SolverAlgorithm = sat3SolverAlgorithm;
        this.reductionVisualizerAlgorithm = reductionVisualizerAlgorithm;
        this.vertexCoverAlgorithm = vertexCoverAlgorithm;
        this.randomizedQuickSortAlgorithm = randomizedQuickSortAlgorithm;
        this.millerRabinAlgorithm = millerRabinAlgorithm;
        this.reservoirSamplingAlgorithm = reservoirSamplingAlgorithm;
        this.blellochScanAlgorithm = blellochScanAlgorithm;
        this.parallelReduceAlgorithm = parallelReduceAlgorithm;
        this.brentTheoremCalculator = brentTheoremCalculator;
    }

    // --- M1 String Endpoints ---
    @PostMapping("/kmp")
    public ResponseEntity<AlgorithmResponse> runKMP(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "SWIFT_PAYMENT_TXN_VERIFIED_SWIFT_PAYMENT_CODE_7712";
        String pattern = req != null && req.getPattern() != null ? req.getPattern() : "SWIFT_PAYMENT";
        AlgorithmResponse response = kmpAlgorithm.execute(text, pattern);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/z-function")
    public ResponseEntity<AlgorithmResponse> runZFunction(@RequestBody(required = false) AlgorithmRequest req) {
        String input = req != null && req.getText() != null ? req.getText() : "TRANSFER_NEFT_TRANSFER_RTGS";
        AlgorithmResponse response = zFunctionAlgorithm.execute(input);
        executionService.recordExecution(response, input.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/rabin-karp")
    public ResponseEntity<AlgorithmResponse> runRabinKarp(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "WIRE_TRANS_ACC_9921_ROUTING_1290_WIRE_TRANS_AUTH";
        String pattern = req != null && req.getPattern() != null ? req.getPattern() : "WIRE_TRANS";
        AlgorithmResponse response = rabinKarpAlgorithm.execute(text, pattern);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/aho-corasick")
    public ResponseEntity<AlgorithmResponse> runAhoCorasick(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "TRANSFER 50000 REQ OTP VERIFICATION FRAUD DETECTED ON STOLEN CARD BLOCKED";
        List<String> patterns = req != null && req.getPatterns() != null && !req.getPatterns().isEmpty() 
                ? req.getPatterns() 
                : List.of("fraud", "otp", "blocked", "stolen", "unauthorized", "phishing");
        AlgorithmResponse response = ahoCorasickAlgorithm.execute(text, patterns);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    // --- M2 Suffix Endpoints ---
    @PostMapping("/suffix-array")
    public ResponseEntity<AlgorithmResponse> runSuffixArray(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "TRANSFER_NEFT_IMPS_SWIFT$";
        String query = req != null && req.getPattern() != null ? req.getPattern() : "NEFT";
        AlgorithmResponse response = suffixArrayAlgorithm.execute(text, query);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/sais")
    public ResponseEntity<AlgorithmResponse> runSAIS(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "BANANA$";
        AlgorithmResponse response = saisAlgorithm.execute(text);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/lcp")
    public ResponseEntity<AlgorithmResponse> runLCP(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "TRANSFER_NEFT_IMPS_TRANSFER_NEFT_RTGS$";
        AlgorithmResponse response = lcpKasaiAlgorithm.execute(text);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/suffix-tree")
    public ResponseEntity<AlgorithmResponse> runSuffixTree(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "SWIFT_PAYMENT$";
        String query = req != null && req.getPattern() != null ? req.getPattern() : "PAY";
        AlgorithmResponse response = suffixTreeAlgorithm.execute(text, query);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/suffix-automaton")
    public ResponseEntity<AlgorithmResponse> runSuffixAutomaton(@RequestBody(required = false) AlgorithmRequest req) {
        String text = req != null && req.getText() != null ? req.getText() : "TRANSFER";
        String query = req != null && req.getPattern() != null ? req.getPattern() : "ANS";
        AlgorithmResponse response = suffixAutomatonAlgorithm.execute(text, query);
        executionService.recordExecution(response, text.length(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    // --- M3 Dynamic Programming Endpoints ---
    @PostMapping("/levenshtein")
    public ResponseEntity<AlgorithmResponse> runLevenshtein(@RequestBody(required = false) AlgorithmRequest req) {
        String src = req != null && req.getSourceText() != null ? req.getSourceText() : "TRANSFER";
        String tgt = req != null && req.getTargetText() != null ? req.getTargetText() : "TRNASFER";
        AlgorithmResponse response = levenshteinAlgorithm.execute(src, tgt);
        executionService.recordExecution(response, Math.max(src.length(), tgt.length()), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/damerau-levenshtein")
    public ResponseEntity<AlgorithmResponse> runDamerauLevenshtein(@RequestBody(required = false) AlgorithmRequest req) {
        String src = req != null && req.getSourceText() != null ? req.getSourceText() : "TRANSFER";
        String tgt = req != null && req.getTargetText() != null ? req.getTargetText() : "TRNASFER";
        AlgorithmResponse response = damerauLevenshteinAlgorithm.execute(src, tgt);
        executionService.recordExecution(response, Math.max(src.length(), tgt.length()), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/weighted-edit-distance")
    public ResponseEntity<AlgorithmResponse> runWeightedEditDistance(@RequestBody(required = false) AlgorithmRequest req) {
        String src = req != null && req.getSourceText() != null ? req.getSourceText() : "SETTLEMENT";
        String tgt = req != null && req.getTargetText() != null ? req.getTargetText() : "SETLEMENT_AUDIT";
        int ins = req != null && req.getWeights() != null ? req.getWeights().getOrDefault("insert", 1) : 1;
        int del = req != null && req.getWeights() != null ? req.getWeights().getOrDefault("delete", 1) : 1;
        int sub = req != null && req.getWeights() != null ? req.getWeights().getOrDefault("substitute", 2) : 2;
        int trans = req != null && req.getWeights() != null ? req.getWeights().getOrDefault("transpose", 2) : 2;
        AlgorithmResponse response = weightedEditDistanceAlgorithm.execute(src, tgt, ins, del, sub, trans);
        executionService.recordExecution(response, Math.max(src.length(), tgt.length()), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/bitmask-dp")
    public ResponseEntity<AlgorithmResponse> runBitmaskDP(@RequestBody(required = false) AlgorithmRequest req) {
        List<String> ops = List.of("Payment", "Transfer", "KYC Verification", "Fraud Check", "Compliance Audit", "Settlement");
        AlgorithmResponse response = bitmaskDPAlgorithm.execute(ops, null);
        executionService.recordExecution(response, ops.size(), req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/matrix-chain")
    public ResponseEntity<AlgorithmResponse> runMatrixChain(@RequestBody(required = false) AlgorithmRequest req) {
        int[] dims = req != null && req.getMatrixDimensions() != null && req.getMatrixDimensions().length > 1
                ? req.getMatrixDimensions() 
                : new int[]{10, 30, 5, 60, 20};
        AlgorithmResponse response = matrixChainAlgorithm.execute(dims);
        executionService.recordExecution(response, dims.length, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    // --- M4 Network Flow Endpoints ---
    @PostMapping("/ford-fulkerson")
    public ResponseEntity<AlgorithmResponse> runFordFulkerson(@RequestBody(required = false) AlgorithmRequest req) {
        AlgorithmResponse response = fordFulkersonAlgorithm.execute(null, null, 0, 5);
        executionService.recordExecution(response, 6, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/edmonds-karp")
    public ResponseEntity<AlgorithmResponse> runEdmondsKarp(@RequestBody(required = false) AlgorithmRequest req) {
        AlgorithmResponse response = edmondsKarpAlgorithm.execute(null, null, 0, 5);
        executionService.recordExecution(response, 6, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/dinic")
    public ResponseEntity<AlgorithmResponse> runDinic(@RequestBody(required = false) AlgorithmRequest req) {
        AlgorithmResponse response = dinicAlgorithm.execute(null, null, 0, 5);
        executionService.recordExecution(response, 6, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/matching")
    public ResponseEntity<AlgorithmResponse> runMatching(@RequestBody(required = false) AlgorithmRequest req) {
        AlgorithmResponse response = bipartiteMatchingAlgorithm.execute(null, null, null);
        executionService.recordExecution(response, 4, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/min-cut")
    public ResponseEntity<AlgorithmResponse> runMinCut(@RequestBody(required = false) AlgorithmRequest req) {
        AlgorithmResponse response = minCutAlgorithm.execute(null, null, 0, 5);
        executionService.recordExecution(response, 6, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    // --- M5 NP & Approximation Endpoints ---
    @PostMapping("/3sat")
    public ResponseEntity<AlgorithmResponse> run3SAT(@RequestBody(required = false) AlgorithmRequest req) {
        int vars = req != null && req.getNumVariables() != null ? req.getNumVariables() : 4;
        List<List<Integer>> clauses = req != null && req.getSatClauses() != null ? req.getSatClauses() : null;
        AlgorithmResponse response = sat3SolverAlgorithm.execute(vars, clauses);
        executionService.recordExecution(response, vars, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reduction-chain")
    public ResponseEntity<AlgorithmResponse> runReduction(@RequestBody(required = false) AlgorithmRequest req) {
        String stage = req != null && req.getText() != null ? req.getText() : "3-SAT";
        AlgorithmResponse response = reductionVisualizerAlgorithm.execute(stage);
        executionService.recordExecution(response, 4, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/vertex-cover")
    public ResponseEntity<AlgorithmResponse> runVertexCover(@RequestBody(required = false) AlgorithmRequest req) {
        AlgorithmResponse response = vertexCoverAlgorithm.execute(null, null);
        executionService.recordExecution(response, 7, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    // --- M6 Randomized & Parallel Endpoints ---
    @PostMapping("/randomized-quicksort")
    public ResponseEntity<AlgorithmResponse> runQuickSort(@RequestBody(required = false) AlgorithmRequest req) {
        int[] amounts = req != null && req.getNumbers() != null ? req.getNumbers() : null;
        AlgorithmResponse response = randomizedQuickSortAlgorithm.execute(amounts);
        executionService.recordExecution(response, amounts != null ? amounts.length : 10, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/miller-rabin")
    public ResponseEntity<AlgorithmResponse> runMillerRabin(@RequestBody(required = false) AlgorithmRequest req) {
        long num = req != null && req.getNumber() != null ? req.getNumber() : 1000000007L;
        AlgorithmResponse response = millerRabinAlgorithm.execute(num, 5);
        executionService.recordExecution(response, 1, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reservoir-sampling")
    public ResponseEntity<AlgorithmResponse> runReservoirSampling(@RequestBody(required = false) AlgorithmRequest req) {
        int k = req != null && req.getSampleSize() != null ? req.getSampleSize() : 5;
        AlgorithmResponse response = reservoirSamplingAlgorithm.execute(k, null);
        executionService.recordExecution(response, 20, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/blelloch-scan")
    public ResponseEntity<AlgorithmResponse> runBlellochScan(@RequestBody(required = false) AlgorithmRequest req) {
        int[] arr = req != null && req.getNumbers() != null ? req.getNumbers() : null;
        AlgorithmResponse response = blellochScanAlgorithm.execute(arr);
        executionService.recordExecution(response, arr != null ? arr.length : 8, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/parallel-reduce")
    public ResponseEntity<AlgorithmResponse> runParallelReduce(@RequestBody(required = false) AlgorithmRequest req) {
        int[] arr = req != null && req.getNumbers() != null ? req.getNumbers() : null;
        int workers = req != null && req.getProcessors() != null ? req.getProcessors() : 4;
        AlgorithmResponse response = parallelReduceAlgorithm.execute(arr, workers);
        executionService.recordExecution(response, arr != null ? arr.length : 8, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/brent-theorem")
    public ResponseEntity<AlgorithmResponse> runBrentTheorem(@RequestBody(required = false) AlgorithmRequest req) {
        int w = req != null && req.getWork() != null ? req.getWork() : 10000;
        int s = req != null && req.getSpan() != null ? req.getSpan() : 100;
        int p = req != null && req.getProcessors() != null ? req.getProcessors() : 16;
        AlgorithmResponse response = brentTheoremCalculator.execute(w, s, p);
        executionService.recordExecution(response, p, req != null ? req.getUserRole() : "USER");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/executions")
    public ResponseEntity<List<AlgorithmExecution>> getRecentExecutions() {
        return ResponseEntity.ok(executionService.getRecentExecutions());
    }
}
