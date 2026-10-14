package com.finserve.repository;

import com.finserve.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByRiskLevel(String riskLevel);
    
    @Query("SELECT c FROM Customer c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.email) LIKE LOWER(CONCAT('%', :query, '%')) OR c.phone LIKE CONCAT('%', :query, '%')")
    List<Customer> searchCustomers(String query);
}
