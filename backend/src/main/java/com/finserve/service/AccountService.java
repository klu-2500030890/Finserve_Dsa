package com.finserve.service;

import com.finserve.model.Account;
import com.finserve.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }

    public List<Account> getAccountsByCustomerId(Long customerId) {
        return accountRepository.findByCustomerId(customerId);
    }

    public Account createAccount(Account account) {
        if (account.getBalance() == null) account.setBalance(BigDecimal.ZERO);
        if (account.getCurrency() == null) account.setCurrency("INR");
        if (account.getStatus() == null) account.setStatus("ACTIVE");
        if (account.getAccountNumber() == null || account.getAccountNumber().isEmpty()) {
            account.setAccountNumber("ACC-" + (1000000000L + (long) (Math.random() * 9000000000L)));
        }
        return accountRepository.save(account);
    }

    public Optional<Account> updateAccountStatus(Long id, String status) {
        return accountRepository.findById(id).map(acc -> {
            acc.setStatus(status);
            return accountRepository.save(acc);
        });
    }

    public boolean deleteAccount(Long id) {
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
