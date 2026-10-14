package com.finserve.algorithm;

import com.finserve.algorithm.dp.*;
import com.finserve.algorithm.graph.*;
import com.finserve.algorithm.np.*;
import com.finserve.algorithm.parallel.*;
import com.finserve.algorithm.randomized.*;
import com.finserve.algorithm.string.*;
import com.finserve.algorithm.suffix.*;
import com.finserve.dto.AlgorithmResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

public class AlgorithmTests {

    private KMPAlgorithm kmp;
    private ZFunctionAlgorithm zFunction;
    private RabinKarpAlgorithm rabinKarp;
    private AhoCorasickAlgorithm ahoCorasick;
    private SuffixArrayAlgorithm suffixArray;
    private LCPKasaiAlgorithm lcpKasai;
    private SuffixAutomatonAlgorithm suffixAutomaton;
    private LevenshteinAlgorithm levenshtein;
    private DamerauLevenshteinAlgorithm damerauLevenshtein;
    private MatrixChainMultiplicationAlgorithm matrixChain;
    private BitmaskDPAlgorithm bitmaskDP;
    private FordFulkersonAlgorithm fordFulkerson;
    private EdmondsKarpAlgorithm edmondsKarp;
    private DinicAlgorithm dinic;
    private BipartiteMatchingAlgorithm bipartiteMatching;
    private MinCutAlgorithm minCut;
    private SAT3SolverAlgorithm sat3Solver;
    private VertexCoverApproximationAlgorithm vertexCover;
    private RandomizedQuickSortAlgorithm quickSort;
    private MillerRabinAlgorithm millerRabin;
    private ReservoirSamplingAlgorithm reservoirSampling;
    private BlellochScanAlgorithm blellochScan;
    private ParallelReduceAlgorithm parallelReduce;
    private BrentTheoremCalculator brentCalculator;

    @BeforeEach
    public void setup() {
        kmp = new KMPAlgorithm();
        zFunction = new ZFunctionAlgorithm();
        rabinKarp = new RabinKarpAlgorithm();
        ahoCorasick = new AhoCorasickAlgorithm();
        suffixArray = new SuffixArrayAlgorithm();
        lcpKasai = new LCPKasaiAlgorithm();
        suffixAutomaton = new SuffixAutomatonAlgorithm();
        levenshtein = new LevenshteinAlgorithm();
        damerauLevenshtein = new DamerauLevenshteinAlgorithm();
        matrixChain = new MatrixChainMultiplicationAlgorithm();
        bitmaskDP = new BitmaskDPAlgorithm();
        fordFulkerson = new FordFulkersonAlgorithm();
        edmondsKarp = new EdmondsKarpAlgorithm();
        dinic = new DinicAlgorithm();
        bipartiteMatching = new BipartiteMatchingAlgorithm();
        minCut = new MinCutAlgorithm();
        sat3Solver = new SAT3SolverAlgorithm();
        vertexCover = new VertexCoverApproximationAlgorithm();
        quickSort = new RandomizedQuickSortAlgorithm();
        millerRabin = new MillerRabinAlgorithm();
        reservoirSampling = new ReservoirSamplingAlgorithm();
        blellochScan = new BlellochScanAlgorithm();
        parallelReduce = new ParallelReduceAlgorithm();
        brentCalculator = new BrentTheoremCalculator();
    }

    @Test
    public void testKMPAlgorithm() {
        AlgorithmResponse res = kmp.execute("ABABDABACDABABCABAB", "ABABCABAB");
        assertNotNull(res);
        Map<?, ?> result = (Map<?, ?>) res.getResult();
        assertTrue((Boolean) result.get("found"));
        List<?> pos = (List<?>) result.get("positions");
        assertEquals(1, pos.size());
        assertEquals(10, pos.get(0));
    }

    @Test
    public void testZFunctionAlgorithm() {
        AlgorithmResponse res = zFunction.execute("aabxaabxcaabxaabxay");
        assertNotNull(res);
        Map<?, ?> result = (Map<?, ?>) res.getResult();
        int[] z = (int[]) result.get("zArray");
        assertTrue(z.length > 0);
    }

    @Test
    public void testRabinKarpAlgorithm() {
        AlgorithmResponse res = rabinKarp.execute("AABAACAADAABAABA", "AABA");
        assertNotNull(res);
        Map<?, ?> result = (Map<?, ?>) res.getResult();
        assertTrue((Boolean) result.get("found"));
        List<?> pos = (List<?>) result.get("positions");
        assertEquals(3, pos.size());
    }

    @Test
    public void testAhoCorasickMultiPattern() {
        AlgorithmResponse res = ahoCorasick.execute("transfer req otp verification fraud detected", List.of("fraud", "otp", "stolen"));
        assertNotNull(res);
        Map<?, ?> result = (Map<?, ?>) res.getResult();
        int totalHits = (Integer) result.get("totalHits");
        assertTrue(totalHits >= 2);
    }

    @Test
    public void testSuffixArrayAndKasaiLCP() {
        AlgorithmResponse saRes = suffixArray.execute("banana$", "ana");
        assertNotNull(saRes);
        AlgorithmResponse lcpRes = lcpKasai.execute("banana$");
        assertNotNull(lcpRes);
    }

    @Test
    public void testLevenshteinAndDamerau() {
        AlgorithmResponse lev = levenshtein.execute("TRANSFER", "TRNASFER");
        Map<?, ?> res1 = (Map<?, ?>) lev.getResult();
        assertEquals(2, res1.get("editDistance")); // 1 replace + 1 replace without transposition

        AlgorithmResponse dam = damerauLevenshtein.execute("TRANSFER", "TRNASFER");
        Map<?, ?> res2 = (Map<?, ?>) dam.getResult();
        assertEquals(1, res2.get("editDistance")); // 1 transposition
    }

    @Test
    public void testMatrixChainMultiplication() {
        AlgorithmResponse res = matrixChain.execute(new int[]{10, 20, 30, 40, 30});
        assertNotNull(res);
        Map<?, ?> result = (Map<?, ?>) res.getResult();
        assertNotNull(result.get("minimumScalarMultiplications"));
    }

    @Test
    public void testNetworkFlowAlgorithms() {
        AlgorithmResponse ff = fordFulkerson.execute(null, null, 0, 5);
        AlgorithmResponse ek = edmondsKarp.execute(null, null, 0, 5);
        AlgorithmResponse din = dinic.execute(null, null, 0, 5);

        assertNotNull(ff);
        assertNotNull(ek);
        assertNotNull(din);
    }

    @Test
    public void testSAT3Solver() {
        List<List<Integer>> clauses = List.of(
                List.of(1, 2, 3),
                List.of(-1, -2, 3)
        );
        AlgorithmResponse res = sat3Solver.execute(3, clauses);
        Map<?, ?> result = (Map<?, ?>) res.getResult();
        assertTrue((Boolean) result.get("satisfiable"));
    }

    @Test
    public void testRandomizedQuickSort() {
        int[] arr = {99, 12, 45, 1, 88, 34, 23, 7};
        AlgorithmResponse res = quickSort.execute(arr);
        Map<?, ?> result = (Map<?, ?>) res.getResult();
        int[] sorted = (int[]) result.get("sortedAmounts");
        assertEquals(1, sorted[0]);
        assertEquals(99, sorted[sorted.length - 1]);
    }

    @Test
    public void testMillerRabinPrimality() {
        AlgorithmResponse resPrime = millerRabin.execute(1000000007L, 5);
        Map<?, ?> pRes = (Map<?, ?>) resPrime.getResult();
        assertTrue((Boolean) pRes.get("isPrime"));

        AlgorithmResponse resComp = millerRabin.execute(1000000008L, 5);
        Map<?, ?> cRes = (Map<?, ?>) resComp.getResult();
        assertFalse((Boolean) cRes.get("isPrime"));
    }

    @Test
    public void testParallelScanAndReduce() {
        AlgorithmResponse scan = blellochScan.execute(new int[]{1, 2, 3, 4, 5, 6, 7, 8});
        assertNotNull(scan);

        AlgorithmResponse red = parallelReduce.execute(new int[]{10, 20, 30, 40}, 2);
        Map<?, ?> rRes = (Map<?, ?>) red.getResult();
        assertEquals(100L, rRes.get("totalAggregateSum"));
    }
}
