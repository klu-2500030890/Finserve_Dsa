package com.finserve.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(name = "risk_level", nullable = false)
    private String riskLevel = "LOW";

    @Column(name = "kyc_status", nullable = false)
    private String kycStatus = "VERIFIED";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Customer() {}

    public Customer(Long id, String name, String email, String phone, String address, String riskLevel, String kycStatus, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.riskLevel = riskLevel != null ? riskLevel : "LOW";
        this.kycStatus = kycStatus != null ? kycStatus : "VERIFIED";
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String address;
        private String riskLevel = "LOW";
        private String kycStatus = "VERIFIED";
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
        public Builder kycStatus(String kycStatus) { this.kycStatus = kycStatus; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Customer build() {
            return new Customer(id, name, email, phone, address, riskLevel, kycStatus, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getKycStatus() { return kycStatus; }
    public void setKycStatus(String kycStatus) { this.kycStatus = kycStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
