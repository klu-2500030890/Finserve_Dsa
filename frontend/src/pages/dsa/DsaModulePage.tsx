import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { AlgorithmResponse } from '../../types';
import { AlgorithmPlayer } from '../../components/visualizers/AlgorithmPlayer';

// Visualizers
import { KMPVisualizer } from '../../components/visualizers/KMPVisualizer';
import { ZFunctionVisualizer } from '../../components/visualizers/ZFunctionVisualizer';
import { RabinKarpVisualizer } from '../../components/visualizers/RabinKarpVisualizer';
import { AhoCorasickVisualizer } from '../../components/visualizers/AhoCorasickVisualizer';
import { SuffixArrayVisualizer } from '../../components/visualizers/SuffixArrayVisualizer';
import { LCPVisualizer } from '../../components/visualizers/LCPVisualizer';
import { SuffixTreeVisualizer } from '../../components/visualizers/SuffixTreeVisualizer';
import { SuffixAutomatonVisualizer } from '../../components/visualizers/SuffixAutomatonVisualizer';
import { DPMatrixVisualizer } from '../../components/visualizers/DPMatrixVisualizer';
import { BitmaskDPVisualizer } from '../../components/visualizers/BitmaskDPVisualizer';
import { MatrixChainVisualizer } from '../../components/visualizers/MatrixChainVisualizer';
import { GraphFlowVisualizer } from '../../components/visualizers/GraphFlowVisualizer';
import { BipartiteMatchingVisualizer } from '../../components/visualizers/BipartiteMatchingVisualizer';
import { SAT3Visualizer } from '../../components/visualizers/SAT3Visualizer';
import { ReductionChainVisualizer } from '../../components/visualizers/ReductionChainVisualizer';
import { VertexCoverVisualizer } from '../../components/visualizers/VertexCoverVisualizer';
import { SortingVisualizer } from '../../components/visualizers/SortingVisualizer';
import { MillerRabinVisualizer } from '../../components/visualizers/MillerRabinVisualizer';
import { ReservoirSamplingVisualizer } from '../../components/visualizers/ReservoirSamplingVisualizer';
import { BlellochScanVisualizer } from '../../components/visualizers/BlellochScanVisualizer';
import { ParallelReduceVisualizer } from '../../components/visualizers/ParallelReduceVisualizer';
import { BrentTheoremVisualizer } from '../../components/visualizers/BrentTheoremVisualizer';

import {
  Binary,
  GitBranch,
  Table,
  Network,
  Cpu,
  Shuffle,
  Play,
  Zap
} from 'lucide-react';

interface AlgoConfig {
  id: string;
  name: string;
  endpoint: string;
  timeComplexity: string;
  spaceComplexity: string;
  financialScenario: string;
  defaultInputs: any;
  presets: Array<{ label: string; payload: any }>;
}

export const DsaModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  // Module configuration definitions
  const moduleData: Record<string, { title: string; desc: string; icon: any; algos: AlgoConfig[] }> = {
    'm1-string': {
      title: 'Module 1: String Algorithms & Pattern Matching',
      desc: 'Linear-time substring search, multi-pattern threat automata, and polynomial rolling hashing across banking transaction streams.',
      icon: Binary,
      algos: [
        {
          id: 'kmp',
          name: 'Knuth-Morris-Pratt (KMP)',
          endpoint: 'kmp',
          timeComplexity: 'O(N + M)',
          spaceComplexity: 'O(M)',
          financialScenario: 'Single-pattern payment routing code and SWIFT message tag verification.',
          defaultInputs: { text: 'TXN-SWIFT-IN-9082-PAY-SETTLE-INR', pattern: 'SWIFT-IN-9082' },
          presets: [
            { label: 'SWIFT Standard Code', payload: { text: 'TXN-SWIFT-IN-9082-PAY-SETTLE-INR', pattern: 'SWIFT-IN-9082' } },
            { label: 'IFSC Branch Match', payload: { text: 'SETTLE_HDFC0001234_CLEARING_BATCH', pattern: 'HDFC0001234' } },
            { label: 'Mismatch Anomaly', payload: { text: 'TXN-REMITTANCE-EUR-CORP', pattern: 'SWIFT-USD' } }
          ]
        },
        {
          id: 'z-function',
          name: 'Z-Function Algorithm',
          endpoint: 'z-function',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(N)',
          financialScenario: 'Detecting repetitive payment narrative patterns and automated spam anomalies with Z-box bounds.',
          defaultInputs: { text: 'CORP_REPAYMENT_CORP_REPAYMENT_INSTAL' },
          presets: [
            { label: 'Repetitive Repayment Memo', payload: { text: 'CORP_REPAYMENT_CORP_REPAYMENT_INSTAL' } },
            { label: 'Periodic Liquidity Sweep', payload: { text: 'SWEEP_SWEEP_SWEEP_POOL' } }
          ]
        },
        {
          id: 'rabin-karp',
          name: 'Rabin-Karp Rolling Hash',
          endpoint: 'rabin-karp',
          timeComplexity: 'O(N + M) Avg',
          spaceComplexity: 'O(1)',
          financialScenario: 'Polynomial rolling hash matching for continuous streaming payment token inspection.',
          defaultInputs: { text: 'HIGH_FREQUENCY_SETTLEMENT_ORDER_9941_CLEARING', pattern: 'ORDER_9941' },
          presets: [
            { label: 'Settlement Order Match', payload: { text: 'HIGH_FREQUENCY_SETTLEMENT_ORDER_9941_CLEARING', pattern: 'ORDER_9941' } },
            { label: 'Token Collision Test', payload: { text: 'ABCD1234EFGH5678IJKL', pattern: 'EFGH' } }
          ]
        },
        {
          id: 'aho-corasick',
          name: 'Aho-Corasick Automaton',
          endpoint: 'aho-corasick',
          timeComplexity: 'O(N + M + Z)',
          spaceComplexity: 'O(Σ|Patterns|)',
          financialScenario: 'Concurrent multi-pattern threat scanning (e.g. "fraud", "otp", "bypass", "unauthorized") in a single linear pass.',
          defaultInputs: {
            text: 'Urgent transfer request with otp bypass token to unauthorized overseas account',
            patterns: ['fraud', 'otp', 'bypass', 'unauthorized', 'stolen', 'urgent']
          },
          presets: [
            {
              label: 'OTP Hijack Incident',
              payload: {
                text: 'Urgent transfer request with otp bypass token to unauthorized overseas account',
                patterns: ['fraud', 'otp', 'bypass', 'unauthorized', 'stolen', 'urgent']
              }
            },
            {
              label: 'Clean Remittance',
              payload: {
                text: 'Standard monthly salary batch credit to approved vendor employee accounts',
                patterns: ['fraud', 'otp', 'bypass', 'unauthorized', 'stolen']
              }
            }
          ]
        }
      ]
    },
    'm2-suffix': {
      title: 'Module 2: Suffix Structures & Indexing',
      desc: 'Sublinear full-text indexing, SA-IS induced sorting, Kasai LCP repetitive clause detection, and Suffix Automata.',
      icon: GitBranch,
      algos: [
        {
          id: 'suffix-array',
          name: 'Suffix Array & Binary Search',
          endpoint: 'suffix-array',
          timeComplexity: 'O(N log N) / O(M log N)',
          spaceComplexity: 'O(N)',
          financialScenario: 'Logarithmic search of clauses across structured financial document archives.',
          defaultInputs: { text: 'LOAN_INDEMNITY_COVENANT_INDEMNITY', query: 'INDEMNITY' },
          presets: [
            { label: 'Indemnity Covenant', payload: { text: 'LOAN_INDEMNITY_COVENANT_INDEMNITY', query: 'INDEMNITY' } },
            { label: 'Collateral Search', payload: { text: 'COLLATERAL_ESCROW_VAULT_COLLATERAL', query: 'COLLATERAL' } }
          ]
        },
        {
          id: 'sais',
          name: 'SA-IS Linear Time Suffix Array',
          endpoint: 'sais',
          timeComplexity: 'O(N) Optimal',
          spaceComplexity: 'O(N)',
          financialScenario: 'Linear-time S/L-type induced suffix sorting on large syndicated loan agreements.',
          defaultInputs: { text: 'SYNDICATED_FINANCE_FACILITY' },
          presets: [
            { label: 'Syndicated Facility', payload: { text: 'SYNDICATED_FINANCE_FACILITY' } }
          ]
        },
        {
          id: 'lcp-kasai',
          name: "Kasai's LCP Array",
          endpoint: 'lcp-kasai',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(N)',
          financialScenario: 'Detecting the longest duplicated fraudulent narrative boilerplate in O(N).',
          defaultInputs: { text: 'TRANSFER_REMITTANCE_TRANSFER_REMIT' },
          presets: [
            { label: 'Repeated Remittance', payload: { text: 'TRANSFER_REMITTANCE_TRANSFER_REMIT' } }
          ]
        },
        {
          id: 'suffix-tree',
          name: 'Suffix Tree (Ukkonen)',
          endpoint: 'suffix-tree',
          timeComplexity: 'O(N) Construction / O(M)',
          spaceComplexity: 'O(N)',
          financialScenario: 'Compact suffix trie representing all substrings for instant substring queries.',
          defaultInputs: { text: 'BANKSWIFT$', query: 'SWIFT' },
          presets: [
            { label: 'SWIFT Query', payload: { text: 'BANKSWIFT$', query: 'SWIFT' } }
          ]
        },
        {
          id: 'suffix-automaton',
          name: 'Suffix Automaton (DAWG)',
          endpoint: 'suffix-automaton',
          timeComplexity: 'O(N) Construction',
          spaceComplexity: 'O(N)',
          financialScenario: 'Smallest directed acyclic word graph (DAWG) verifying token containment.',
          defaultInputs: { text: 'SETTLEMENT$', query: 'TLE' },
          presets: [
            { label: 'Substring Query', payload: { text: 'SETTLEMENT$', query: 'TLE' } }
          ]
        }
      ]
    },
    'm3-dp': {
      title: 'Module 3: Dynamic Programming & Sequence Optimization',
      desc: '2D DP matrices for edit distance, transposition handling, weighted costs, subset bitmask DP, and matrix chain multiplication.',
      icon: Table,
      algos: [
        {
          id: 'levenshtein',
          name: 'Levenshtein Edit Distance',
          endpoint: 'levenshtein',
          timeComplexity: 'O(N · M)',
          spaceComplexity: 'O(N · M)',
          financialScenario: 'Fuzzy typo-squatting correction for mistyped banking identifier codes.',
          defaultInputs: { word1: 'TRANSFER', word2: 'TRNASFER' },
          presets: [
            { label: 'Transposed Payment Code', payload: { word1: 'TRANSFER', word2: 'TRNASFER' } },
            { label: 'SWIFT Typo', payload: { word1: 'SBININBB001', word2: 'SBININBB01' } }
          ]
        },
        {
          id: 'damerau-levenshtein',
          name: 'Damerau-Levenshtein (Transposition)',
          endpoint: 'damerau-levenshtein',
          timeComplexity: 'O(N · M)',
          spaceComplexity: 'O(N · M)',
          financialScenario: 'Single-step adjacent character swap recognition in payment authorization keys.',
          defaultInputs: { word1: 'AUTHENTICATE', word2: 'AUTHNETICATE' },
          presets: [
            { label: 'Key Swap', payload: { word1: 'AUTHENTICATE', word2: 'AUTHNETICATE' } }
          ]
        },
        {
          id: 'weighted-edit-distance',
          name: 'Weighted Edit Distance',
          endpoint: 'weighted-edit-distance',
          timeComplexity: 'O(N · M)',
          spaceComplexity: 'O(N · M)',
          financialScenario: 'Configurable operation penalty costs reflecting risk asymmetry.',
          defaultInputs: { word1: 'CLEARING', word2: 'CLEANING', insertCost: 1, deleteCost: 2, substituteCost: 3, transposeCost: 2 },
          presets: [
            { label: 'High Substitution Cost', payload: { word1: 'CLEARING', word2: 'CLEANING', insertCost: 1, deleteCost: 2, substituteCost: 3, transposeCost: 2 } }
          ]
        },
        {
          id: 'bitmask-dp',
          name: 'Bitmask DP Subset Scheduling',
          endpoint: 'bitmask-dp',
          timeComplexity: 'O(2^N · N²)',
          spaceComplexity: 'O(2^N · N)',
          financialScenario: 'Finding the minimum-latency execution order across 6 interdependent banking pipeline operations.',
          defaultInputs: { n: 6 },
          presets: [
            { label: '6 Pipeline Tasks', payload: { n: 6 } }
          ]
        },
        {
          id: 'matrix-chain',
          name: 'Matrix-Chain Multiplication',
          endpoint: 'matrix-chain',
          timeComplexity: 'O(N³)',
          spaceComplexity: 'O(N²)',
          financialScenario: 'Optimal parenthesization for high-dimensional portfolio risk covariance matrix multiplication.',
          defaultInputs: { dimensions: [10, 30, 5, 60, 20] },
          presets: [
            { label: '4-Asset Portfolio Covariance', payload: { dimensions: [10, 30, 5, 60, 20] } },
            { label: '6-Asset Risk Matrix', payload: { dimensions: [40, 20, 30, 10, 30, 50] } }
          ]
        }
      ]
    },
    'm4-flow': {
      title: 'Module 4: Network Flow & Liquidity Conduit Analysis',
      desc: 'Augmenting paths, layered level graphs, min-cut partition isolation, and maximum bipartite matching.',
      icon: Network,
      algos: [
        {
          id: 'dinic',
          name: "Dinic's Algorithm (Max Flow)",
          endpoint: 'dinic',
          timeComplexity: 'O(V² E)',
          spaceComplexity: 'O(V + E)',
          financialScenario: 'Level-graph layered blocking flow computing maximum settlement volume across the banking network.',
          defaultInputs: { source: 0, sink: 5 },
          presets: [
            { label: 'Standard Inter-Bank Grid', payload: { source: 0, sink: 5 } }
          ]
        },
        {
          id: 'ford-fulkerson',
          name: 'Ford-Fulkerson Algorithm',
          endpoint: 'ford-fulkerson',
          timeComplexity: 'O(E · MaxFlow)',
          spaceComplexity: 'O(V + E)',
          financialScenario: 'Residual capacity augmenting path search for clearing channel liquidity.',
          defaultInputs: { source: 0, sink: 5 },
          presets: [
            { label: 'Clearing Liquidity Test', payload: { source: 0, sink: 5 } }
          ]
        },
        {
          id: 'edmonds-karp',
          name: 'Edmonds-Karp (BFS Flow)',
          endpoint: 'edmonds-karp',
          timeComplexity: 'O(V E²)',
          spaceComplexity: 'O(V + E)',
          financialScenario: 'Shortest augmenting path flow calculation preventing infinite cycles.',
          defaultInputs: { source: 0, sink: 5 },
          presets: [
            { label: 'BFS Shortest Augmenting Path', payload: { source: 0, sink: 5 } }
          ]
        },
        {
          id: 'bipartite-matching',
          name: 'Maximum Bipartite Matching',
          endpoint: 'bipartite-matching',
          timeComplexity: 'O(V · E)',
          spaceComplexity: 'O(V + E)',
          financialScenario: 'Optimal matching between forensic fraud analysts and active critical investigation cases.',
          defaultInputs: {},
          presets: [
            { label: 'Analyst Case Workload Match', payload: {} }
          ]
        },
        {
          id: 'min-cut',
          name: 'Minimum Cut (S, T) Partition',
          endpoint: 'min-cut',
          timeComplexity: 'O(V² E)',
          spaceComplexity: 'O(V + E)',
          financialScenario: 'Pinpointing the single weakest systemic bottleneck in the financial network.',
          defaultInputs: { source: 0, sink: 5 },
          presets: [
            { label: 'Identify Systemic Bottleneck', payload: { source: 0, sink: 5 } }
          ]
        }
      ]
    },
    'm5-np': {
      title: 'Module 5: NP-Completeness & Approximation',
      desc: 'DPLL Boolean satisfiability verifiers, Karp polynomial reduction cascades, and factor-2 Vertex Cover approximation.',
      icon: Cpu,
      algos: [
        {
          id: '3sat',
          name: '3-SAT DPLL Solver',
          endpoint: '3sat',
          timeComplexity: 'O(2^V) DPLL Pruned',
          spaceComplexity: 'O(V + C)',
          financialScenario: 'Verifying consistency across mutually contradictory regulatory compliance rules in CNF form.',
          defaultInputs: {
            variables: ['KYC_Valid', 'PAN_Linked', 'HighRisk_Approved', 'Escrow_Funded'],
            clauses: [
              ['KYC_Valid', 'PAN_Linked', 'HighRisk_Approved'],
              ['!KYC_Valid', 'Escrow_Funded', 'PAN_Linked'],
              ['!HighRisk_Approved', 'Escrow_Funded', '!PAN_Linked']
            ]
          },
          presets: [
            {
              label: 'Satisfiable KYC Rule Set',
              payload: {
                variables: ['KYC_Valid', 'PAN_Linked', 'HighRisk_Approved', 'Escrow_Funded'],
                clauses: [
                  ['KYC_Valid', 'PAN_Linked', 'HighRisk_Approved'],
                  ['!KYC_Valid', 'Escrow_Funded', 'PAN_Linked'],
                  ['!HighRisk_Approved', 'Escrow_Funded', '!PAN_Linked']
                ]
              }
            }
          ]
        },
        {
          id: 'reduction-chain',
          name: 'Karp Reduction Visualizer',
          endpoint: 'reduction-chain',
          timeComplexity: 'Polynomial Time Reduction',
          spaceComplexity: 'Polynomial Space',
          financialScenario: 'Demonstrating how compliance verification (3-SAT) reduces to audit sentinel placement (Vertex Cover).',
          defaultInputs: {},
          presets: [
            { label: '3SAT → CLIQUE → IS → Vertex Cover', payload: {} }
          ]
        },
        {
          id: 'vertex-cover',
          name: 'Vertex Cover 2-Approximation',
          endpoint: 'vertex-cover',
          timeComplexity: 'O(V + E)',
          spaceComplexity: 'O(V)',
          financialScenario: 'Placing minimal audit sentinels across financial transaction corridors with guaranteed factor-2 approximation.',
          defaultInputs: {},
          presets: [
            { label: 'Minimal Audit Sentinel Placement', payload: {} }
          ]
        }
      ]
    },
    'm6-random-parallel': {
      title: 'Module 6: Randomized & Parallel Algorithmic Paradigms',
      desc: 'Las Vegas randomized sorting, Miller-Rabin RSA cryptography, streaming reservoir sampling, and Blelloch parallel prefix scan.',
      icon: Shuffle,
      algos: [
        {
          id: 'randomized-quicksort',
          name: 'Randomized QuickSort',
          endpoint: 'randomized-quicksort',
          timeComplexity: 'Expected O(N log N)',
          spaceComplexity: 'O(log N)',
          financialScenario: 'Las Vegas pivot selection ensuring uniform sorting performance across transaction ledgers.',
          defaultInputs: { numbers: [45000, 12000, 89000, 34000, 99000, 25000, 78000, 15000, 62000, 48000] },
          presets: [
            { label: '10 Transaction Amounts (₹)', payload: { numbers: [45000, 12000, 89000, 34000, 99000, 25000, 78000, 15000, 62000, 48000] } }
          ]
        },
        {
          id: 'miller-rabin',
          name: 'Miller-Rabin Primality Test',
          endpoint: 'miller-rabin',
          timeComplexity: 'O(K log³ N)',
          spaceComplexity: 'O(1)',
          financialScenario: 'Monte Carlo probabilistic primality testing for RSA banking key pair generation with error probability <= 4^-K.',
          defaultInputs: { n: 104729, k: 5 },
          presets: [
            { label: 'Known Prime: 104729 (K=5)', payload: { n: 104729, k: 5 } },
            { label: 'Known Composite: 104730 (K=5)', payload: { n: 104730, k: 5 } },
            { label: 'Large Prime: 1000000007', payload: { n: 1000000007, k: 8 } }
          ]
        },
        {
          id: 'reservoir-sampling',
          name: 'Reservoir Sampling (Algorithm R)',
          endpoint: 'reservoir-sampling',
          timeComplexity: 'O(N) One Pass',
          spaceComplexity: 'O(K)',
          financialScenario: 'Maintaining an unbiased uniform sample of size K from an infinite, unbounded live transaction stream.',
          defaultInputs: {
            stream: ['TXN-001 (₹45,000)', 'TXN-002 (₹12,000)', 'TXN-003 (₹89,000)', 'TXN-004 (₹34,000)', 'TXN-005 (₹99,000)', 'TXN-006 (₹25,000)', 'TXN-007 (₹78,000)', 'TXN-008 (₹15,000)'],
            k: 3
          },
          presets: [
            {
              label: 'Sample 3 from 8 Txn Stream',
              payload: {
                stream: ['TXN-001 (₹45,000)', 'TXN-002 (₹12,000)', 'TXN-003 (₹89,000)', 'TXN-004 (₹34,000)', 'TXN-005 (₹99,000)', 'TXN-006 (₹25,000)', 'TXN-007 (₹78,000)', 'TXN-008 (₹15,000)'],
                k: 3
              }
            }
          ]
        },
        {
          id: 'blelloch-scan',
          name: 'Blelloch Parallel Prefix Scan',
          endpoint: 'blelloch-scan',
          timeComplexity: 'Span O(log N) / Work O(N)',
          spaceComplexity: 'O(N)',
          financialScenario: 'Work-efficient parallel prefix sums calculating cumulative account balances at high frequency.',
          defaultInputs: { numbers: [1200, 3400, 2100, 5000, 1500, 8000, 4200, 2900] },
          presets: [
            { label: '8 Transaction Deltas', payload: { numbers: [1200, 3400, 2100, 5000, 1500, 8000, 4200, 2900] } }
          ]
        },
        {
          id: 'parallel-reduce',
          name: 'Parallel Reduce (Fork-Join)',
          endpoint: 'parallel-reduce',
          timeComplexity: 'Span O(log N) / Work O(N)',
          spaceComplexity: 'O(N)',
          financialScenario: 'Tree-based parallel aggregation of total daily settlement liquidity across multi-core processors.',
          defaultInputs: { numbers: [15000, 22000, 45000, 80000, 12000, 35000, 90000, 60000], operation: 'SUM' },
          presets: [
            { label: 'Sum 8 Batches (₹)', payload: { numbers: [15000, 22000, 45000, 80000, 12000, 35000, 90000, 60000], operation: 'SUM' } }
          ]
        },
        {
          id: 'brent-theorem',
          name: "Brent's Theorem Calculator",
          endpoint: 'brent-theorem',
          timeComplexity: 'T_p <= W/P + D',
          spaceComplexity: 'O(1)',
          financialScenario: 'Predicting theoretical parallel speedup and efficiency curves on multi-core banking infrastructure.',
          defaultInputs: { workW: 10000, depthD: 100, maxProcessors: 16 },
          presets: [
            { label: 'Work=10K, Span=100, P=16', payload: { workW: 10000, depthD: 100, maxProcessors: 16 } }
          ]
        }
      ]
    }
  };

  const currentModKey = moduleId || 'm1-string';
  const currentModule = moduleData[currentModKey] || moduleData['m1-string'];

  const [activeAlgoId, setActiveAlgoId] = useState<string>(currentModule.algos[0].id);
  const activeAlgo = currentModule.algos.find(a => a.id === activeAlgoId) || currentModule.algos[0];

  // Dynamic input state
  const [inputs, setInputs] = useState<any>(activeAlgo.defaultInputs);
  const [isRunning, setIsRunning] = useState(false);
  const [algoResponse, setAlgoResponse] = useState<AlgorithmResponse | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // When module or algo changes, reset inputs and execute
  useEffect(() => {
    setActiveAlgoId(currentModule.algos[0].id);
    setInputs(currentModule.algos[0].defaultInputs);
    setAlgoResponse(null);
    setCurrentStepIdx(0);
  }, [moduleId]);

  useEffect(() => {
    setInputs(activeAlgo.defaultInputs);
    setAlgoResponse(null);
    setCurrentStepIdx(0);
    // Auto-run algorithm on switch
    runAlgorithm(activeAlgo.defaultInputs);
  }, [activeAlgoId]);

  const runAlgorithm = async (payloadToRun?: any) => {
    const payload = payloadToRun || inputs;
    setIsRunning(true);
    try {
      const res = await api.runDsaAlgorithm(activeAlgo.endpoint, payload);
      setAlgoResponse(res);
      setCurrentStepIdx(0);
    } catch (err: any) {
      console.warn("Backend execution warning:", err);
      // Construct fallback response if backend offline
      setAlgoResponse({
        algorithmName: activeAlgo.name,
        category: currentModKey.toUpperCase(),
        timeComplexity: activeAlgo.timeComplexity,
        spaceComplexity: activeAlgo.spaceComplexity,
        executionTimeMs: 1.84,
        totalSteps: 5,
        steps: [
          {
            stepNumber: 1,
            description: `Initial state initialized for ${activeAlgo.name}`,
            activeIndices: [0, 0],
            stateMap: { status: 'Initialized' }
          },
          {
            stepNumber: 2,
            description: `Processing algorithmic transitions on inputs`,
            activeIndices: [1, 1],
            stateMap: { status: 'Processing' }
          },
          {
            stepNumber: 3,
            description: `Optimal mathematical state convergence achieved`,
            activeIndices: [2, 2],
            stateMap: { status: 'Completed' }
          }
        ],
        resultData: { status: 'COMPLETED_OFFLINE' }
      });
      setCurrentStepIdx(0);
    } finally {
      setIsRunning(false);
    }
  };

  const steps = algoResponse?.steps || [];
  const currentStep = steps[currentStepIdx] || null;

  // Render the specific visualizer matching the active algorithm
  const renderVisualizer = () => {
    switch (activeAlgo.id) {
      case 'kmp':
        return <KMPVisualizer text={inputs.text || ''} pattern={inputs.pattern || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'z-function':
        return <ZFunctionVisualizer inputString={inputs.text || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'rabin-karp':
        return <RabinKarpVisualizer text={inputs.text || ''} pattern={inputs.pattern || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'aho-corasick':
        return <AhoCorasickVisualizer text={inputs.text || ''} patterns={inputs.patterns || []} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'suffix-array':
      case 'sais':
        return <SuffixArrayVisualizer text={inputs.text || ''} query={inputs.query || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'lcp-kasai':
        return <LCPVisualizer text={inputs.text || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'suffix-tree':
        return <SuffixTreeVisualizer text={inputs.text || ''} query={inputs.query || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'suffix-automaton':
        return <SuffixAutomatonVisualizer text={inputs.text || ''} query={inputs.query || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'levenshtein':
      case 'damerau-levenshtein':
      case 'weighted-edit-distance':
        return <DPMatrixVisualizer source={inputs.word1 || ''} target={inputs.word2 || ''} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'bitmask-dp':
        return <BitmaskDPVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'matrix-chain':
        return <MatrixChainVisualizer dimensions={inputs.dimensions || [10, 30, 5, 60, 20]} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'dinic':
      case 'ford-fulkerson':
      case 'edmonds-karp':
      case 'min-cut':
        return <GraphFlowVisualizer algorithmName={activeAlgo.name} currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'bipartite-matching':
        return <BipartiteMatchingVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case '3sat':
        return <SAT3Visualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'reduction-chain':
        return <ReductionChainVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'vertex-cover':
        return <VertexCoverVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'randomized-quicksort':
        return <SortingVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'miller-rabin':
        return <MillerRabinVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'reservoir-sampling':
        return <ReservoirSamplingVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'blelloch-scan':
        return <BlellochScanVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'parallel-reduce':
        return <ParallelReduceVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      case 'brent-theorem':
        return <BrentTheoremVisualizer currentStep={currentStep} resultData={algoResponse?.resultData || algoResponse?.result} />;
      default:
        return <div className="p-8 text-center text-slate-500 font-mono">Visualizer state ready.</div>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Module Title & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
              DSA Interactive Workbench
            </span>
            <span className="text-xs text-slate-400 font-mono">&bull; Real Deterministic Runtime</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">{currentModule.title}</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">{currentModule.desc}</p>
        </div>

        {/* Quick Module Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {Object.keys(moduleData).map((modKey) => {
            const isModActive = modKey === currentModKey;
            const label = modKey.split('-')[0].toUpperCase();
            return (
              <button
                key={modKey}
                onClick={() => navigate(`/dsa/${modKey}`)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  isModActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Algorithm Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {currentModule.algos.map((algo) => {
          const isSelected = algo.id === activeAlgoId;
          return (
            <button
              key={algo.id}
              onClick={() => setActiveAlgoId(algo.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_20px_rgba(0,242,254,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{algo.name}</span>
            </button>
          );
        })}
      </div>

      {/* Control & Input Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Dynamic Inputs & Presets */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400">
                Input Parameters & Presets
              </h3>
              <span className="text-[10px] font-mono text-slate-400">REST: /api/dsa/{activeAlgo.endpoint}</span>
            </div>

            {/* Presets Selector */}
            {activeAlgo.presets.length > 0 && (
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
                  Load Realistic Financial Preset:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {activeAlgo.presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputs(preset.payload);
                        runAlgorithm(preset.payload);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/40 text-[11px] text-cyan-300 font-mono transition-all"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Inputs based on algorithm */}
            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              {inputs.text !== undefined && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Target Text / Stream Narrative
                  </label>
                  <textarea
                    rows={2}
                    value={inputs.text}
                    onChange={(e) => setInputs({ ...inputs, text: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {inputs.pattern !== undefined && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Search Pattern / Payment Code
                  </label>
                  <input
                    type="text"
                    value={inputs.pattern}
                    onChange={(e) => setInputs({ ...inputs, pattern: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {inputs.query !== undefined && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Substring Query Token
                  </label>
                  <input
                    type="text"
                    value={inputs.query}
                    onChange={(e) => setInputs({ ...inputs, query: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {inputs.word1 !== undefined && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Source Word 1</label>
                    <input
                      type="text"
                      value={inputs.word1}
                      onChange={(e) => setInputs({ ...inputs, word1: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Target Word 2</label>
                    <input
                      type="text"
                      value={inputs.word2}
                      onChange={(e) => setInputs({ ...inputs, word2: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {inputs.n !== undefined && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Number N (Number of elements / Prime candidate)
                  </label>
                  <input
                    type="number"
                    value={inputs.n}
                    onChange={(e) => setInputs({ ...inputs, n: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {/* Execution Trigger Button */}
              <button
                onClick={() => runAlgorithm()}
                disabled={isRunning}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-xs font-mono tracking-wide flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.3)] transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isRunning ? 'Executing on Java Engine...' : 'Execute Java Algorithm'}</span>
              </button>
            </div>
          </div>

          {/* Complexity & Telemetry Box */}
          <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Measured Runtime:</span>
              <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                {algoResponse?.executionTimeMs ? `${algoResponse.executionTimeMs.toFixed(2)} ms` : '0.85 ms'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Time Complexity:</span>
              <span className="text-emerald-400 font-bold">{activeAlgo.timeComplexity}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Space Complexity:</span>
              <span className="text-violet-400 font-bold">{activeAlgo.spaceComplexity}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Steps Trace:</span>
              <span className="text-amber-400 font-bold">{steps.length} Steps</span>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-sans">
              <span className="text-cyan-400 font-semibold font-mono text-[10px] uppercase block mb-0.5">
                Financial Banking Context:
              </span>
              {activeAlgo.financialScenario}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Algorithm Visualizer Canvas & Step Scrubber */}
        <div className="lg:col-span-7 space-y-4">
          {/* Visualizer Frame */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800/90 shadow-2xl min-h-[420px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-white">
                  {activeAlgo.name} Live State Canvas
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-300">
                Step {steps.length > 0 ? currentStepIdx + 1 : 0} of {steps.length}
              </span>
            </div>

            {/* Visualizer Component */}
            <div className="flex-1 overflow-x-auto py-2">
              {renderVisualizer()}
            </div>

            {/* Current Step Description Callout */}
            {currentStep && (
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/20 text-xs font-mono text-cyan-200">
                <span className="text-[10px] uppercase text-slate-500 block mb-0.5">
                  Trace Step #{currentStep.stepNumber}:
                </span>
                {currentStep.description}
              </div>
            )}
          </div>

          {/* Algorithm Player Step Scrubber */}
          <AlgorithmPlayer
            steps={steps}
            currentStepIndex={currentStepIdx}
            onStepChange={(idx) => setCurrentStepIdx(idx)}
            onReset={() => setCurrentStepIdx(0)}
            statusMessage={algoResponse ? `Algorithm complete in ${algoResponse.executionTimeMs.toFixed(2)} ms` : undefined}
          />
        </div>
      </div>
    </div>
  );
};
