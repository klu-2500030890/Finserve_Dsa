# Finserve_Dsa

Enterprise Financial Services platform integrated with comprehensive Data Structures & Algorithms (DSA) visualizers and automated fraud detection pipelines.

## Overview

**Finserve DSA** pairs real-world financial transaction monitoring, AML investigation cases, and risk scoring with step-by-step interactive algorithmic visualizers. It demonstrates the direct application of advanced algorithms to financial infrastructure:

- **String & Suffix Automata**: Fast keyword matching for suspicious transaction memos, financial document indexing, and fraud signatures using Aho-Corasick, KMP, Rabin-Karp, Z-Function, Suffix Automaton, Suffix Arrays (SA-IS), and Suffix Trees.
- **Network Flow & Bipartite Matching**: Maximum flow and transaction routing optimization.
- **Randomized Algorithms**: Miller-Rabin primality testing (cryptographic key exchange simulation), Randomized QuickSort, and Reservoir Sampling on live transaction streams.
- **Dynamic Programming**: Portfolio optimization, matrix chain multiplication, and bitmask DP.
- **Parallel Algorithms**: Blelloch prefix scan and parallel tree reductions.
- **NP-Completeness & Reductions**: Interactive 3-SAT, Vertex Cover, and reduction chains.

---

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 25 (or Java 17+)
- **Database**: In-memory H2 Database (with MySQL compatibility mode)
- **Persistence**: Spring Data JPA / Hibernate
- **Port**: `8088`

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4, Lucide React
- **Animations**: Framer Motion, Canvas Confetti
- **Charts**: Recharts
- **PDF Export**: jsPDF + autotable
- **Port**: `5173` (proxies `/api` to `http://localhost:8088`)

---

## Getting Started

### Prerequisites
- JDK 17 or higher (Java 25 recommended)
- Node.js 18+ and npm

### 1. Run the Backend
```bash
cd backend
./mvnw.cmd spring-boot:run   # On Windows
# or ./mvnw spring-boot:run  # On Linux/macOS
```
The backend will start at `http://localhost:8088`.
H2 Console is available at `http://localhost:8088/h2-console` (`JDBC URL: jdbc:h2:mem:finservedb`, `user: sa`, no password).

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.
