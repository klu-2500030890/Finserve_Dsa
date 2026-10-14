package com.finserve;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FinServeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinServeApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("  FINServe — Intelligent Banking Analytics Platform      ");
        System.out.println("  Turning Financial Data into Algorithmic Intelligence   ");
        System.out.println("  Server is listening on http://localhost:8080           ");
        System.out.println("  H2 Console accessible at http://localhost:8080/h2-console");
        System.out.println("=========================================================");
    }
}
