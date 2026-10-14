package com.finserve.controller;

import com.finserve.model.Account;
import com.finserve.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(originPatterns = "*")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts(@RequestParam(required = false) Long customerId) {
        if (customerId != null) {
            return ResponseEntity.ok(accountService.getAccountsByCustomerId(customerId));
        }
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return ResponseEntity.ok(accountService.createAccount(account));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Account> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return accountService.updateAccountStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        if (accountService.deleteAccount(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
