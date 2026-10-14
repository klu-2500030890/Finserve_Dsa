package com.finserve.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = "*")
public class AuthController {

    public static class RoleInfo {
        public String id;
        public String name;
        public String description;
        public String defaultEmail;
        public List<String> permissions;

        public RoleInfo(String id, String name, String description, String defaultEmail, List<String> permissions) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.defaultEmail = defaultEmail;
            this.permissions = permissions;
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<List<RoleInfo>> getAvailableRoles() {
        List<RoleInfo> roles = List.of(
                new RoleInfo(
                        "ADMINISTRATOR",
                        "System Owner & Chief Architect",
                        "Complete superuser access: System administration, global configuration, database operations, full audit logs, and performance benchmarking.",
                        "admin@finserve.corp",
                        List.of("ALL_ACCESS", "SYSTEM_SETTINGS", "DATABASE_MANAGE", "USER_MANAGEMENT", "ALGORITHM_BENCHMARK", "AUDIT_VIEW")
                ),
                new RoleInfo(
                        "MANAGER",
                        "Fraud & Operations Risk Manager",
                        "Operational management: Fraud pattern investigation, payment approvals, transaction freezes, case escalation, and analyst assignment.",
                        "manager@finserve.corp",
                        List.of("FRAUD_INVESTIGATION", "CASE_MANAGEMENT", "TRANSACTION_OVERRIDE", "ANALYST_DISPATCH", "COMPLIANCE_REPORTS")
                ),
                new RoleInfo(
                        "USER",
                        "Customer & Testing Analyst",
                        "Operational testing: Initiate transfers within ₹1,00,000 regulatory limit, 2FA OTP verification, full access to test all DSA algorithm labs and inspect live execution traces.",
                        "analyst@finserve.corp",
                        List.of("INITIATE_TRANSACTION", "TEST_DSA_LAB", "SEARCH_DOCUMENTS", "VIEW_NETWORK", "STREAM_ANALYTICS")
                )
        );
        return ResponseEntity.ok(roles);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String role = credentials.getOrDefault("role", "ADMINISTRATOR").toUpperCase();
        String username = credentials.getOrDefault("username", "Analyst");

        Map<String, Object> session = new HashMap<>();
        session.put("authenticated", true);
        session.put("role", role);
        session.put("username", username.isEmpty() ? "Lead Analyst" : username);
        session.put("token", "JWT-FINSERVE-" + UUID.randomUUID());
        session.put("expiresIn", 86400);

        return ResponseEntity.ok(session);
    }
}
