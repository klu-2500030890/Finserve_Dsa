package com.finserve.dto;

import java.util.*;

public class DashboardStatsDto {
    private long totalCustomers;
    private long totalAccounts;
    private long totalTransactions;
    private long totalFraudEvents;
    private long totalDocuments;
    private long totalAlgorithmsExecuted;
    private double totalVolumeInr;
    private double fraudRatePercent;
    private List<Map<String, Object>> recentActivity = new ArrayList<>();
    private List<Map<String, Object>> volumeByHour = new ArrayList<>();
    private List<Map<String, Object>> dsaExecutionDistribution = new ArrayList<>();
    private List<Map<String, Object>> riskDistribution = new ArrayList<>();

    public DashboardStatsDto() {}

    public DashboardStatsDto(long totalCustomers, long totalAccounts, long totalTransactions, long totalFraudEvents, long totalDocuments, long totalAlgorithmsExecuted, double totalVolumeInr, double fraudRatePercent, List<Map<String, Object>> recentActivity, List<Map<String, Object>> volumeByHour, List<Map<String, Object>> dsaExecutionDistribution, List<Map<String, Object>> riskDistribution) {
        this.totalCustomers = totalCustomers;
        this.totalAccounts = totalAccounts;
        this.totalTransactions = totalTransactions;
        this.totalFraudEvents = totalFraudEvents;
        this.totalDocuments = totalDocuments;
        this.totalAlgorithmsExecuted = totalAlgorithmsExecuted;
        this.totalVolumeInr = totalVolumeInr;
        this.fraudRatePercent = fraudRatePercent;
        this.recentActivity = recentActivity != null ? recentActivity : new ArrayList<>();
        this.volumeByHour = volumeByHour != null ? volumeByHour : new ArrayList<>();
        this.dsaExecutionDistribution = dsaExecutionDistribution != null ? dsaExecutionDistribution : new ArrayList<>();
        this.riskDistribution = riskDistribution != null ? riskDistribution : new ArrayList<>();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private long totalCustomers;
        private long totalAccounts;
        private long totalTransactions;
        private long totalFraudEvents;
        private long totalDocuments;
        private long totalAlgorithmsExecuted;
        private double totalVolumeInr;
        private double fraudRatePercent;
        private List<Map<String, Object>> recentActivity = new ArrayList<>();
        private List<Map<String, Object>> volumeByHour = new ArrayList<>();
        private List<Map<String, Object>> dsaExecutionDistribution = new ArrayList<>();
        private List<Map<String, Object>> riskDistribution = new ArrayList<>();

        public Builder totalCustomers(long totalCustomers) { this.totalCustomers = totalCustomers; return this; }
        public Builder totalAccounts(long totalAccounts) { this.totalAccounts = totalAccounts; return this; }
        public Builder totalTransactions(long totalTransactions) { this.totalTransactions = totalTransactions; return this; }
        public Builder totalFraudEvents(long totalFraudEvents) { this.totalFraudEvents = totalFraudEvents; return this; }
        public Builder totalDocuments(long totalDocuments) { this.totalDocuments = totalDocuments; return this; }
        public Builder totalAlgorithmsExecuted(long totalAlgorithmsExecuted) { this.totalAlgorithmsExecuted = totalAlgorithmsExecuted; return this; }
        public Builder totalVolumeInr(double totalVolumeInr) { this.totalVolumeInr = totalVolumeInr; return this; }
        public Builder fraudRatePercent(double fraudRatePercent) { this.fraudRatePercent = fraudRatePercent; return this; }
        public Builder recentActivity(List<Map<String, Object>> recentActivity) { this.recentActivity = recentActivity; return this; }
        public Builder volumeByHour(List<Map<String, Object>> volumeByHour) { this.volumeByHour = volumeByHour; return this; }
        public Builder dsaExecutionDistribution(List<Map<String, Object>> dsaExecutionDistribution) { this.dsaExecutionDistribution = dsaExecutionDistribution; return this; }
        public Builder riskDistribution(List<Map<String, Object>> riskDistribution) { this.riskDistribution = riskDistribution; return this; }

        public DashboardStatsDto build() {
            return new DashboardStatsDto(totalCustomers, totalAccounts, totalTransactions, totalFraudEvents, totalDocuments, totalAlgorithmsExecuted, totalVolumeInr, fraudRatePercent, recentActivity, volumeByHour, dsaExecutionDistribution, riskDistribution);
        }
    }

    public long getTotalCustomers() { return totalCustomers; }
    public void setTotalCustomers(long totalCustomers) { this.totalCustomers = totalCustomers; }

    public long getTotalAccounts() { return totalAccounts; }
    public void setTotalAccounts(long totalAccounts) { this.totalAccounts = totalAccounts; }

    public long getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(long totalTransactions) { this.totalTransactions = totalTransactions; }

    public long getTotalFraudEvents() { return totalFraudEvents; }
    public void setTotalFraudEvents(long totalFraudEvents) { this.totalFraudEvents = totalFraudEvents; }

    public long getTotalDocuments() { return totalDocuments; }
    public void setTotalDocuments(long totalDocuments) { this.totalDocuments = totalDocuments; }

    public long getTotalAlgorithmsExecuted() { return totalAlgorithmsExecuted; }
    public void setTotalAlgorithmsExecuted(long totalAlgorithmsExecuted) { this.totalAlgorithmsExecuted = totalAlgorithmsExecuted; }

    public double getTotalVolumeInr() { return totalVolumeInr; }
    public void setTotalVolumeInr(double totalVolumeInr) { this.totalVolumeInr = totalVolumeInr; }

    public double getFraudRatePercent() { return fraudRatePercent; }
    public void setFraudRatePercent(double fraudRatePercent) { this.fraudRatePercent = fraudRatePercent; }

    public List<Map<String, Object>> getRecentActivity() { return recentActivity; }
    public void setRecentActivity(List<Map<String, Object>> recentActivity) { this.recentActivity = recentActivity; }

    public List<Map<String, Object>> getVolumeByHour() { return volumeByHour; }
    public void setVolumeByHour(List<Map<String, Object>> volumeByHour) { this.volumeByHour = volumeByHour; }

    public List<Map<String, Object>> getDsaExecutionDistribution() { return dsaExecutionDistribution; }
    public void setDsaExecutionDistribution(List<Map<String, Object>> dsaExecutionDistribution) { this.dsaExecutionDistribution = dsaExecutionDistribution; }

    public List<Map<String, Object>> getRiskDistribution() { return riskDistribution; }
    public void setRiskDistribution(List<Map<String, Object>> riskDistribution) { this.riskDistribution = riskDistribution; }
}
