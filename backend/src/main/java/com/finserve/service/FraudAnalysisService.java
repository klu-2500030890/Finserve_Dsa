package com.finserve.service;

import com.finserve.model.FraudEvent;
import com.finserve.repository.FraudEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FraudAnalysisService {

    private final FraudEventRepository fraudEventRepository;

    @Autowired
    public FraudAnalysisService(FraudEventRepository fraudEventRepository) {
        this.fraudEventRepository = fraudEventRepository;
    }

    public List<FraudEvent> getAllFraudEvents() {
        return fraudEventRepository.findAll();
    }

    public List<FraudEvent> getRecentFraudEvents() {
        return fraudEventRepository.findTop20ByOrderByTimestampDesc();
    }

    public Optional<FraudEvent> getFraudEventById(Long id) {
        return fraudEventRepository.findById(id);
    }

    public FraudEvent updateStatus(Long id, String status) {
        FraudEvent event = fraudEventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Fraud Event ID " + id + " not found."));
        event.setStatus(status);
        return fraudEventRepository.save(event);
    }
}
