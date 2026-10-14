import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';

interface DemoContextType {
  isDemoActive: boolean;
  activeDemoStep: number;
  startDemoTour: () => void;
  stopDemoTour: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  demoNotification: string | null;
  triggerNotification: (msg: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const demoSteps = [
  {
    step: 1,
    title: "1. Intelligent Command Dashboard",
    path: "/dashboard",
    description: "Welcome to FINServe! Monitor live KPI metrics, animated particle stream flow, and real-time fraud indicators across your financial institution."
  },
  {
    step: 2,
    title: "2. Financial Transactions & ₹1 Lakh Limit",
    path: "/transactions",
    description: "Inspect banking transactions. Notice the strict ₹1,00,000 regulatory limit, 2FA Mobile OTP verification, and automated Aho-Corasick risk scoring."
  },
  {
    step: 3,
    title: "3. DSA Lab — String Intelligence (M1)",
    path: "/dsa/m1-string",
    description: "Knuth-Morris-Pratt (KMP) & Aho-Corasick Multi-Pattern Automaton scanning payment codes and detecting concurrent fraud keywords in O(N + M)."
  },
  {
    step: 4,
    title: "4. DSA Lab — Suffix Intelligence (M2)",
    path: "/dsa/m2-suffix",
    description: "Suffix Arrays, SA-IS Linear Time Sorting, and Kasai's LCP finding duplicated transaction clauses and malicious payloads."
  },
  {
    step: 5,
    title: "5. DSA Lab — Dynamic Programming (M3)",
    path: "/dsa/m3-dp",
    description: "Levenshtein & Damerau-Levenshtein 2D matrices resolving typo-squatted payment codes with adjacent transposition detection."
  },
  {
    step: 6,
    title: "6. DSA Lab — Network Flow (M4)",
    path: "/dsa/m4-flow",
    description: "Dinic's Layered Level Graphs, Edmonds-Karp BFS, and Max-Flow Min-Cut identifying critical liquidity bottlenecks."
  },
  {
    step: 7,
    title: "7. DSA Lab — NP & Approximation (M5)",
    path: "/dsa/m5-np",
    description: "3-SAT DPLL constraint solver and Vertex Cover 2-Approximation for optimal security audit sentinel placement."
  },
  {
    step: 8,
    title: "8. DSA Lab — Randomized & Parallel (M6)",
    path: "/dsa/m6-random-parallel",
    description: "Miller-Rabin crypto primality test, Blelloch Parallel Scan, and Reservoir Sampling on live transaction streams."
  },
  {
    step: 9,
    title: "9. Network Topology & Flow Explorer",
    path: "/network-explorer",
    description: "Interactive visual banking graph: pan, zoom, adjust node capacities, and execute max flow & min cut directly."
  },
  {
    step: 10,
    title: "10. Executive DSA & Performance Reports",
    path: "/reports",
    description: "Generate comprehensive academic project documentation, verified benchmark measurements, and export PDF/CSV reports."
  }
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [activeDemoStep, setActiveDemoStep] = useState(0);
  const [demoNotification, setDemoNotification] = useState<string | null>(null);

  const startDemoTour = () => {
    setIsDemoActive(true);
    setActiveDemoStep(0);
    try {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.8 } });
    } catch {
      // ignore
    }
  };

  const stopDemoTour = () => {
    setIsDemoActive(false);
    setActiveDemoStep(0);
  };

  const nextDemoStep = () => {
    if (activeDemoStep < demoSteps.length - 1) {
      setActiveDemoStep(prev => prev + 1);
    } else {
      stopDemoTour();
      try {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const prevDemoStep = () => {
    if (activeDemoStep > 0) {
      setActiveDemoStep(prev => prev - 1);
    }
  };

  const triggerNotification = (msg: string) => {
    setDemoNotification(msg);
    setTimeout(() => setDemoNotification(null), 4000);
  };

  return (
    <DemoContext.Provider value={{
      isDemoActive,
      activeDemoStep,
      startDemoTour,
      stopDemoTour,
      nextDemoStep,
      prevDemoStep,
      demoNotification,
      triggerNotification
    }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
};
