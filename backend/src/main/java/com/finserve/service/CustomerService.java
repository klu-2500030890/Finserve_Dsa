package com.finserve.service;

import com.finserve.model.Customer;
import com.finserve.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public List<Customer> searchCustomers(String query) {
        if (query == null || query.trim().isEmpty()) {
            return customerRepository.findAll();
        }
        return customerRepository.searchCustomers(query.trim());
    }

    public Customer createCustomer(Customer customer) {
        if (customer.getRiskLevel() == null) customer.setRiskLevel("LOW");
        if (customer.getKycStatus() == null) customer.setKycStatus("VERIFIED");
        return customerRepository.save(customer);
    }

    public Optional<Customer> updateCustomer(Long id, Customer updated) {
        return customerRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setEmail(updated.getEmail());
            existing.setPhone(updated.getPhone());
            existing.setAddress(updated.getAddress());
            existing.setRiskLevel(updated.getRiskLevel());
            existing.setKycStatus(updated.getKycStatus());
            return customerRepository.save(existing);
        });
    }

    public boolean deleteCustomer(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
