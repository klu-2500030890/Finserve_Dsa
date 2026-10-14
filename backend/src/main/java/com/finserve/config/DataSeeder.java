package com.finserve.config;

import com.finserve.model.*;
import com.finserve.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final FraudEventRepository fraudEventRepository;
    private final FinancialDocumentRepository documentRepository;
    private final AnalystRepository analystRepository;
    private final InvestigationCaseRepository investigationCaseRepository;
    private final AlgorithmExecutionRepository algorithmExecutionRepository;
    private final AuditLogRepository auditLogRepository;

    @Autowired
    public DataSeeder(
            CustomerRepository customerRepository,
            AccountRepository accountRepository,
            TransactionRepository transactionRepository,
            FraudEventRepository fraudEventRepository,
            FinancialDocumentRepository documentRepository,
            AnalystRepository analystRepository,
            InvestigationCaseRepository investigationCaseRepository,
            AlgorithmExecutionRepository algorithmExecutionRepository,
            AuditLogRepository auditLogRepository) {
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.fraudEventRepository = fraudEventRepository;
        this.documentRepository = documentRepository;
        this.analystRepository = analystRepository;
        this.investigationCaseRepository = investigationCaseRepository;
        this.algorithmExecutionRepository = algorithmExecutionRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (customerRepository.count() > 0) {
            return;
        }

        System.out.println("Seeding FINServe Synthetic Academic Financial Dataset (100+ customers, 150+ accounts, 500+ transactions)...");

        // 1. Seed Analysts
        List<Analyst> analysts = List.of(
                Analyst.builder().name("Dr. Sarah Jenkins").email("s.jenkins@finserve.corp").specialization("AML_FRAUD").availability(true).role("ADMINISTRATOR").build(),
                Analyst.builder().name("Devin Vance").email("d.vance@finserve.corp").specialization("CYBER_FORENSICS").availability(true).role("MANAGER").build(),
                Analyst.builder().name("Kartikeya B.").email("kartikeya@finserve.corp").specialization("HIGH_FREQUENCY_FLOW").availability(true).role("ADMINISTRATOR").build(),
                Analyst.builder().name("Abhiram M.").email("abhiram.m@finserve.corp").specialization("COMPLIANCE").availability(true).role("MANAGER").build(),
                Analyst.builder().name("Abhiram Varma B.").email("varma.b@finserve.corp").specialization("GRAPH_ALGORITHMS").availability(true).role("ANALYST").build(),
                Analyst.builder().name("Elena Rostova").email("e.rostova@finserve.corp").specialization("AML_FRAUD").availability(false).role("ANALYST").build()
        );
        analystRepository.saveAll(analysts);

        // 2. Seed 105 Customers
        List<Customer> customerList = new ArrayList<>();
        String[] firstNames = {"Aarav", "Priya", "Vikram", "Ananya", "Rohan", "Sneha", "Karan", "Aditi", "Rahul", "Meera", "Arjun", "Divya", "Siddharth", "Pooja", "Nikhil", "Ishita", "Amit", "Neha", "Varun", "Rhea", "Manish", "Tanvi"};
        String[] lastNames = {"Sharma", "Verma", "Patel", "Reddy", "Mehta", "Nair", "Kapoor", "Gupta", "Deshmukh", "Singhania", "Iyer", "Chopra", "Malhotra", "Saxena", "Bansal"};
        String[] cities = {"Mumbai", "Bengaluru", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "London", "Singapore", "Zurich", "New York"};
        String[] risks = {"LOW", "LOW", "LOW", "LOW", "MEDIUM", "MEDIUM", "HIGH", "CRITICAL"};

        Random rand = new Random(101);

        for (int i = 1; i <= 105; i++) {
            String fName = firstNames[rand.nextInt(firstNames.length)];
            String lName = lastNames[rand.nextInt(lastNames.length)];
            String city = cities[rand.nextInt(cities.length)];
            String risk = risks[rand.nextInt(risks.length)];
            String phone = "+91 9" + (100000000L + rand.nextInt(899999999));

            Customer c = Customer.builder()
                    .name(fName + " " + lName)
                    .email(fName.toLowerCase() + "." + lName.toLowerCase() + i + "@globalfin.org")
                    .phone(phone)
                    .address("Suite #" + (100 + i) + ", Cyber Towers, " + city)
                    .riskLevel(risk)
                    .kycStatus("CRITICAL".equals(risk) ? "PENDING" : "VERIFIED")
                    .createdAt(LocalDateTime.now().minusDays(rand.nextInt(180)))
                    .build();
            customerList.add(c);
        }
        customerList = customerRepository.saveAll(customerList);

        // 3. Seed 160 Accounts
        List<Account> accountList = new ArrayList<>();
        String[] accTypes = {"SAVINGS", "CHECKING", "WEALTH_MANAGEMENT", "ESCROW", "CORPORATE"};

        for (Customer cust : customerList) {
            int count = (cust.getId() % 3 == 0) ? 2 : 1;
            for (int k = 0; k < count; k++) {
                String accNum = "ACC-90" + String.format("%08d", (cust.getId() * 10 + k));
                BigDecimal balance = BigDecimal.valueOf(15000 + rand.nextInt(850000));

                Account acc = Account.builder()
                        .customerId(cust.getId())
                        .accountNumber(accNum)
                        .accountType(accTypes[rand.nextInt(accTypes.length)])
                        .balance(balance)
                        .currency("INR")
                        .status("CRITICAL".equals(cust.getRiskLevel()) ? "SUSPENDED" : "ACTIVE")
                        .createdAt(cust.getCreatedAt())
                        .build();
                accountList.add(acc);
            }
        }
        accountList = accountRepository.saveAll(accountList);

        // 4. Seed 520 Transactions
        List<Transaction> txnList = new ArrayList<>();
        String[] txnTypes = {"TRANSFER", "PAYMENT", "WITHDRAWAL", "DEPOSIT", "SETTLEMENT", "FX_CONVERSION"};
        String[] locations = {"Mumbai Gateway", "Delhi Switch", "Bengaluru Hub", "Hyderabad DC", "Singapore Hub", "London Settlement", "Zurich Vault", "Suspicious Tor Exit Node"};

        for (int i = 1; i <= 520; i++) {
            Account acc = accountList.get(rand.nextInt(accountList.size()));
            Customer cust = customerRepository.findById(acc.getCustomerId()).orElse(customerList.get(0));

            BigDecimal amount = BigDecimal.valueOf(500 + rand.nextInt(99000));
            String type = txnTypes[rand.nextInt(txnTypes.length)];
            String loc = locations[rand.nextInt(locations.length)];

            boolean isSuspicious = (i % 23 == 0) || (i % 37 == 0);
            String paymentCode = isSuspicious 
                    ? "TX-FRAUD-" + (8000 + i) 
                    : "TXN-OK-" + String.format("%06d", i);

            String desc = isSuspicious 
                    ? "Urgent transfer req otp verification to bypass blocked account with stolen credentials" 
                    : "Standard invoice settlement and vendor payout for order #" + (10000 + i);

            double riskScore = isSuspicious ? (75.0 + rand.nextInt(25)) : (5.0 + rand.nextInt(35));
            String status = riskScore >= 85.0 ? "BLOCKED_FRAUD" : (riskScore >= 65.0 ? "ESCALATED_MANAGER" : "COMPLETED");

            Transaction txn = Transaction.builder()
                    .accountId(acc.getId())
                    .customerId(cust.getId())
                    .amount(amount)
                    .transactionType(type)
                    .paymentCode(paymentCode)
                    .description(desc)
                    .location(loc)
                    .status(status)
                    .riskScore(riskScore)
                    .otpVerified(!isSuspicious)
                    .verifiedPhone(cust.getPhone())
                    .flaggedByDsa(isSuspicious ? "Aho-Corasick Keyword Trigger + High Risk" : "Normal Heuristics")
                    .timestamp(LocalDateTime.now().minusHours(520 - i))
                    .build();
            txnList.add(txn);
        }
        txnList = transactionRepository.saveAll(txnList);

        // 5. Seed Fraud Events & Investigation Cases
        List<FraudEvent> fraudEvents = new ArrayList<>();
        List<InvestigationCase> cases = new ArrayList<>();

        for (Transaction t : txnList) {
            if ("BLOCKED_FRAUD".equals(t.getStatus()) || "ESCALATED_MANAGER".equals(t.getStatus())) {
                FraudEvent fe = FraudEvent.builder()
                        .transactionId(t.getId())
                        .pattern(t.getPaymentCode().contains("FRAUD") ? "UNAUTHORIZED_CREDENTIAL_DRAIN" : "ANOMALOUS_VELOCITY")
                        .severity(t.getRiskScore() >= 85.0 ? "CRITICAL" : "HIGH")
                        .detectedBy("Aho-Corasick Automaton + KMP Matcher")
                        .details("Flagged with Risk Score " + String.format("%.1f", t.getRiskScore()) + "/100. Memo: \"" + t.getDescription() + "\"")
                        .status("DETECTED")
                        .timestamp(t.getTimestamp())
                        .build();
                fraudEvents.add(fe);

                InvestigationCase ic = InvestigationCase.builder()
                        .title("Incident #" + t.getId() + " - " + t.getPaymentCode())
                        .priority(t.getRiskScore() >= 85.0 ? "CRITICAL" : "HIGH")
                        .status("OPEN")
                        .transactionId(t.getId())
                        .assignedAnalystId(analysts.get(rand.nextInt(analysts.size())).getId())
                        .assignedAnalystName(analysts.get(rand.nextInt(analysts.size())).getName())
                        .notes("Automated escalation generated during transaction risk analysis.")
                        .createdAt(t.getTimestamp())
                        .build();
                cases.add(ic);
            }
        }
        fraudEventRepository.saveAll(fraudEvents);
        investigationCaseRepository.saveAll(cases);

        // 6. Seed Financial Documents
        List<FinancialDocument> docs = List.of(
                FinancialDocument.builder().customerId(customerList.get(0).getId()).title("Global Cross-Border SWIFT Settlement Protocol 2026").documentType("COMPLIANCE_FILING").content("Standard SWIFT ISO 20022 message formatting mandates end-to-end verification, anti-money laundering checks, and automated pattern detection for fraudulent correspondent accounts.").indexedKeywords("SWIFT, ISO20022, AML, Settlement, SuffixTree, KMP").createdAt(LocalDateTime.now().minusDays(10)).build(),
                FinancialDocument.builder().customerId(customerList.get(1).getId()).title("Syndicated Credit Facility & Escrow Covenant").documentType("LOAN_AGREEMENT").content("The escrow disbursement clause guarantees minimum liquidity ratios and enforces algorithmic max-flow constraints before releasing tranche funds.").indexedKeywords("Escrow, Liquidity, Covenant, Dinic, MaxFlow").createdAt(LocalDateTime.now().minusDays(15)).build(),
                FinancialDocument.builder().customerId(customerList.get(2).getId()).title("Cyber Incident Forensic Audit Memo #4419").documentType("AUDIT_REPORT").content("Investigation into unauthorized session hijacking revealed multiple suspicious transposition tokens and rapid OTP retry anomalies.").indexedKeywords("Forensics, Hijacking, DamerauLevenshtein, OTP, Fraud").createdAt(LocalDateTime.now().minusDays(5)).build(),
                FinancialDocument.builder().customerId(customerList.get(3).getId()).title("Quarterly High-Frequency Liquidity Stress Test").documentType("RISK_ASSESSMENT").content("Simulated parallel reduce aggregations and Brent's theorem scaling bounds over 10 million transactions to verify bank solvency under peak market volatility.").indexedKeywords("StressTest, ParallelReduce, Blelloch, BrentTheorem, Solvency").createdAt(LocalDateTime.now().minusDays(2)).build()
        );
        documentRepository.saveAll(docs);

        // 7. Seed Initial Algorithm Executions
        List<AlgorithmExecution> algoExecs = List.of(
                AlgorithmExecution.builder().algorithm("Aho-Corasick Multi-Pattern Automaton").module("M1_STRING").inputSize(520).executionTimeNs(2410000L).executionTimeMs(2.41).memoryUsedKb(1024L).resultSummary("Scanned 520 transactions and isolated 18 fraud indicators").complexityTime("O(N + sum(M))").complexitySpace("O(sum(M))").executedByRole("ADMINISTRATOR").executedAt(LocalDateTime.now().minusHours(1)).build(),
                AlgorithmExecution.builder().algorithm("Dinic's Algorithm (Layered Max Flow)").module("M4_FLOW").inputSize(6).executionTimeNs(1150000L).executionTimeMs(1.15).memoryUsedKb(512L).resultSummary("Computed Max Liquidity Flow = 28 Lakhs / sec").complexityTime("O(V^2 * E)").complexitySpace("O(V^2)").executedByRole("MANAGER").executedAt(LocalDateTime.now().minusMinutes(45)).build(),
                AlgorithmExecution.builder().algorithm("Levenshtein Distance DP").module("M3_DP").inputSize(18).executionTimeNs(820000L).executionTimeMs(0.82).memoryUsedKb(256L).resultSummary("Resolved typo-squatted payment memo with Edit Distance = 2").complexityTime("O(N * M)").complexitySpace("O(N * M)").executedByRole("USER").executedAt(LocalDateTime.now().minusMinutes(20)).build(),
                AlgorithmExecution.builder().algorithm("Knuth-Morris-Pratt (KMP)").module("M1_STRING").inputSize(120).executionTimeNs(310000L).executionTimeMs(0.31).memoryUsedKb(128L).resultSummary("Exact match found for payment code SWIFT-KMP-8831").complexityTime("O(N + M)").complexitySpace("O(M)").executedByRole("USER").executedAt(LocalDateTime.now().minusMinutes(5)).build()
        );
        algorithmExecutionRepository.saveAll(algoExecs);

        // 8. Seed Audit Logs
        List<AuditLog> auditLogs = List.of(
                AuditLog.builder().action("SYSTEM_INIT").performedBy("SYSTEM_AUTO").role("ADMINISTRATOR").details("FINServe Academic Database and DSA Intelligence Engine booted successfully.").status("SUCCESS").timestamp(LocalDateTime.now().minusHours(24)).build(),
                AuditLog.builder().action("SEED_SYNTHETIC_DATA").performedBy("ADMINISTRATOR").role("ADMINISTRATOR").details("Seeded 105 customers, 160 accounts, and 520 transactions with verified limits.").status("SUCCESS").timestamp(LocalDateTime.now().minusHours(23)).build(),
                AuditLog.builder().action("EXECUTE_FRAUD_SCAN").performedBy("MANAGER").role("MANAGER").details("Executed Aho-Corasick batch scan over recent transaction pipeline.").status("SUCCESS").timestamp(LocalDateTime.now().minusHours(1)).build()
        );
        auditLogRepository.saveAll(auditLogs);

        System.out.println("FINServe Data Seeding Complete! Ready for demonstration.");
    }
}
