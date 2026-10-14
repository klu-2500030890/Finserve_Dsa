package com.finserve.service;

import com.finserve.algorithm.string.AhoCorasickAlgorithm;
import com.finserve.algorithm.string.KMPAlgorithm;
import com.finserve.algorithm.dp.LevenshteinAlgorithm;
import com.finserve.dto.AlgorithmResponse;
import com.finserve.dto.TransactionRequest;
import com.finserve.model.*;
import com.finserve.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class TransactionService {

    public static final BigDecimal MAX_TRANSACTION_LIMIT = new BigDecimal("100000.00"); // ₹1 Lakh limit

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;
    private final FraudEventRepository fraudEventRepository;
    private final InvestigationCaseRepository investigationCaseRepository;
    private final AuditLogRepository auditLogRepository;
    private final AhoCorasickAlgorithm ahoCorasickAlgorithm;
    private final KMPAlgorithm kmpAlgorithm;
    private final LevenshteinAlgorithm levenshteinAlgorithm;

    @Autowired
    public TransactionService(
            TransactionRepository transactionRepository,
            AccountRepository accountRepository,
            CustomerRepository customerRepository,
            FraudEventRepository fraudEventRepository,
            InvestigationCaseRepository investigationCaseRepository,
            AuditLogRepository auditLogRepository,
            AhoCorasickAlgorithm ahoCorasickAlgorithm,
            KMPAlgorithm kmpAlgorithm,
            LevenshteinAlgorithm levenshteinAlgorithm) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
        this.fraudEventRepository = fraudEventRepository;
        this.investigationCaseRepository = investigationCaseRepository;
        this.auditLogRepository = auditLogRepository;
        this.ahoCorasickAlgorithm = ahoCorasickAlgorithm;
        this.kmpAlgorithm = kmpAlgorithm;
        this.levenshteinAlgorithm = levenshteinAlgorithm;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getRecentTransactions() {
        return transactionRepository.findTop20ByOrderByTimestampDesc();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<Transaction> searchTransactions(String query) {
        if (query == null || query.trim().isEmpty()) {
            return transactionRepository.findAll();
        }
        return transactionRepository.searchTransactions(query.trim());
    }

    public List<Transaction> getHighRiskTransactions() {
        return transactionRepository.findHighRiskTransactions(70.0);
    }

    @Transactional
    public Transaction processTransaction(TransactionRequest req) {
        // Validation 1: Hard Max limit check (₹1 Lakh)
        if (req.getAmount() == null || req.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Transaction amount must be strictly greater than 0.");
        }
        if (req.getAmount().compareTo(MAX_TRANSACTION_LIMIT) > 0) {
            throw new IllegalArgumentException("Transaction rejected: Amount ₹" + req.getAmount() + " exceeds the maximum allowed regulatory limit of ₹1,00,000 (1 Lakh).");
        }

        // Fetch Account
        Account account = accountRepository.findById(req.getAccountId())
                .orElseThrow(() -> new IllegalArgumentException("Account ID " + req.getAccountId() + " not found."));

        if (!"ACTIVE".equalsIgnoreCase(account.getStatus())) {
            throw new IllegalStateException("Cannot process transaction on account with status: " + account.getStatus());
        }

        // Fetch Customer
        Customer customer = customerRepository.findById(account.getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found for account."));

        // Validation 2: Verify user details & Phone consistency
        if (req.getPhone() != null && !req.getPhone().trim().isEmpty()) {
            if (!customer.getPhone().replaceAll("[^0-9]", "").endsWith(req.getPhone().replaceAll("[^0-9]", ""))) {
                throw new IllegalArgumentException("Security verification failed: Provided mobile number does not match customer's registered phone number.");
            }
        }

        // Algorithmic Fraud Detection: Aho-Corasick Multi-Pattern Scan on Description
        List<String> fraudKeywords = List.of("fraud", "otp", "blocked", "stolen", "unauthorized", "phishing", "launder", "bypass");
        AlgorithmResponse acResponse = ahoCorasickAlgorithm.execute(req.getDescription() + " " + req.getPaymentCode(), fraudKeywords);
        
        int fraudKeywordHits = 0;
        if (acResponse.getResult() instanceof Map) {
            Map<?, ?> resMap = (Map<?, ?>) acResponse.getResult();
            Object hitsObj = resMap.get("totalHits");
            if (hitsObj instanceof Number) {
                fraudKeywordHits = ((Number) hitsObj).intValue();
            }
        }

        // Calculate dynamic risk score (0.0 to 100.0)
        double riskScore = 10.0;
        if (req.getAmount().compareTo(new BigDecimal("75000")) > 0) riskScore += 25.0;
        if ("HIGH".equalsIgnoreCase(customer.getRiskLevel())) riskScore += 30.0;
        if ("CRITICAL".equalsIgnoreCase(customer.getRiskLevel())) riskScore += 50.0;
        if (fraudKeywordHits > 0) riskScore += (fraudKeywordHits * 25.0);
        if (req.getLocation() != null && req.getLocation().toLowerCase().contains("threat")) riskScore += 40.0;

        if (riskScore > 100.0) riskScore = 100.0;

        // Determine initial status
        String status = "COMPLETED";
        if (riskScore >= 80.0 || fraudKeywordHits >= 2) {
            status = "BLOCKED_FRAUD";
        } else if (riskScore >= 60.0) {
            status = "ESCALATED_MANAGER";
        }

        boolean isOtpValid = req.getOtp() != null && (req.getOtp().equals("123456") || req.getOtp().length() == 6);

        Transaction txn = Transaction.builder()
                .accountId(account.getId())
                .customerId(customer.getId())
                .amount(req.getAmount())
                .transactionType(req.getTransactionType() != null ? req.getTransactionType() : "TRANSFER")
                .paymentCode(req.getPaymentCode() != null ? req.getPaymentCode() : "TXN-" + System.currentTimeMillis())
                .description(req.getDescription() != null ? req.getDescription() : "Financial Transfer")
                .location(req.getLocation() != null ? req.getLocation() : "Mumbai Gateway")
                .status(status)
                .riskScore(riskScore)
                .otpVerified(isOtpValid)
                .verifiedPhone(customer.getPhone())
                .flaggedByDsa(fraudKeywordHits > 0 ? "Aho-Corasick Pattern Scan (" + fraudKeywordHits + " hits)" : "Normal Heuristics")
                .timestamp(LocalDateTime.now())
                .build();

        txn = transactionRepository.save(txn);

        if ("COMPLETED".equals(status)) {
            account.setBalance(account.getBalance().subtract(req.getAmount()));
            accountRepository.save(account);
        }

        if ("BLOCKED_FRAUD".equals(status) || "ESCALATED_MANAGER".equals(status)) {
            FraudEvent event = FraudEvent.builder()
                    .transactionId(txn.getId())
                    .pattern(fraudKeywordHits > 0 ? "SUSPICIOUS_KEYWORD_MATCH" : "HIGH_RISK_ANOMALY")
                    .severity(riskScore >= 80.0 ? "CRITICAL" : "HIGH")
                    .detectedBy("Aho-Corasick + Risk Engine")
                    .details("Risk score " + riskScore + "/100. Keyword hits: " + fraudKeywordHits + ". Memo: " + req.getDescription())
                    .status("DETECTED")
                    .timestamp(LocalDateTime.now())
                    .build();
            fraudEventRepository.save(event);

            InvestigationCase ic = InvestigationCase.builder()
                    .title("Escalated Transaction #" + txn.getId() + " - " + txn.getPaymentCode())
                    .priority(riskScore >= 80.0 ? "CRITICAL" : "HIGH")
                    .status("OPEN")
                    .transactionId(txn.getId())
                    .notes("Automated escalation triggered by FINServe DSA Risk Sentinel.")
                    .createdAt(LocalDateTime.now())
                    .build();
            investigationCaseRepository.save(ic);
        }

        AuditLog auditLog = AuditLog.builder()
                .action("CREATE_TRANSACTION")
                .performedBy(customer.getName())
                .role(req.getUserRole() != null ? req.getUserRole() : "USER")
                .details("Amount: ₹" + req.getAmount() + " | Risk: " + riskScore + " | Status: " + status)
                .status(status)
                .timestamp(LocalDateTime.now())
                .build();
        auditLogRepository.save(auditLog);

        return txn;
    }

    @Transactional
    public Transaction updateTransactionStatus(Long id, String newStatus, String managerRole, String note) {
        Transaction txn = transactionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transaction ID " + id + " not found."));
        
        txn.setStatus(newStatus);
        transactionRepository.save(txn);

        AuditLog auditLog = AuditLog.builder()
                .action("UPDATE_TRANSACTION_STATUS")
                .performedBy(managerRole)
                .role(managerRole)
                .details("Transaction #" + id + " updated to " + newStatus + ". Note: " + (note != null ? note : "None"))
                .status("SUCCESS")
                .timestamp(LocalDateTime.now())
                .build();
        auditLogRepository.save(auditLog);

        return txn;
    }
}
