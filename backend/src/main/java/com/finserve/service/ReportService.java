package com.finserve.service;

import com.finserve.dto.DashboardStatsDto;
import com.finserve.model.Transaction;
import com.finserve.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class ReportService {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final FraudEventRepository fraudEventRepository;
    private final FinancialDocumentRepository documentRepository;
    private final AlgorithmExecutionRepository algorithmExecutionRepository;

    @Autowired
    public ReportService(
            CustomerRepository customerRepository,
            AccountRepository accountRepository,
            TransactionRepository transactionRepository,
            FraudEventRepository fraudEventRepository,
            FinancialDocumentRepository documentRepository,
            AlgorithmExecutionRepository algorithmExecutionRepository) {
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.fraudEventRepository = fraudEventRepository;
        this.documentRepository = documentRepository;
        this.algorithmExecutionRepository = algorithmExecutionRepository;
    }

    public DashboardStatsDto getDashboardStats() {
        long custCount = customerRepository.count();
        long accCount = accountRepository.count();
        long txnCount = transactionRepository.count();
        long fraudCount = fraudEventRepository.count();
        long docCount = documentRepository.count();
        long algoCount = algorithmExecutionRepository.count();

        List<Transaction> allTxns = transactionRepository.findAll();
        double totalVolume = allTxns.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .doubleValue();

        double fraudRate = txnCount > 0 ? ((double) fraudCount / txnCount) * 100.0 : 0.0;

        List<Map<String, Object>> volumeByHour = new ArrayList<>();
        String[] hours = {"00:00", "04:00", "08:00", "12:00", "16:00", "20:00"};
        int[] vols = {420000, 180000, 1250000, 2890000, 3100000, 1950000};
        for (int i = 0; i < hours.length; i++) {
            volumeByHour.add(Map.of("time", hours[i], "volume", vols[i], "txnCount", 40 + i * 25));
        }

        List<Map<String, Object>> dsaDistribution = List.of(
                Map.of("name", "M1: String Search", "value", 35, "color", "#00f2fe"),
                Map.of("name", "M2: Suffix Structures", "value", 20, "color", "#7928ca"),
                Map.of("name", "M3: Dynamic Programming", "value", 18, "color", "#ff0080"),
                Map.of("name", "M4: Network Flow", "value", 12, "color", "#00f5a0"),
                Map.of("name", "M5: NP & Approx", "value", 8, "color", "#f59e0b"),
                Map.of("name", "M6: Randomized/Parallel", "value", 7, "color", "#3b82f6")
        );

        List<Map<String, Object>> riskDistribution = List.of(
                Map.of("name", "Low Risk (< 40)", "count", 412, "fill", "#10b981"),
                Map.of("name", "Medium Risk (40-70)", "count", 68, "fill", "#f59e0b"),
                Map.of("name", "High Risk (70-85)", "count", 18, "fill", "#f97316"),
                Map.of("name", "Critical (> 85)", "count", 7, "fill", "#ef4444")
        );

        return DashboardStatsDto.builder()
                .totalCustomers(custCount)
                .totalAccounts(accCount)
                .totalTransactions(txnCount)
                .totalFraudEvents(fraudCount)
                .totalDocuments(docCount)
                .totalAlgorithmsExecuted(algoCount)
                .totalVolumeInr(totalVolume)
                .fraudRatePercent(fraudRate)
                .volumeByHour(volumeByHour)
                .dsaExecutionDistribution(dsaDistribution)
                .riskDistribution(riskDistribution)
                .build();
    }
}
