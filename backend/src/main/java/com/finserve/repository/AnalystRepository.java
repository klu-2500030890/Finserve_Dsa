package com.finserve.repository;

import com.finserve.model.Analyst;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnalystRepository extends JpaRepository<Analyst, Long> {
    List<Analyst> findByAvailability(Boolean availability);
    List<Analyst> findByRole(String role);
}
