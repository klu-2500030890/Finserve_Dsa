package com.finserve.model;

import jakarta.persistence.*;

@Entity
@Table(name = "analysts")
public class Analyst {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private Boolean availability = true;

    @Column(nullable = false)
    private String role = "ANALYST";

    public Analyst() {}

    public Analyst(Long id, String name, String email, String specialization, Boolean availability, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.specialization = specialization;
        this.availability = availability != null ? availability : true;
        this.role = role != null ? role : "ANALYST";
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private String specialization;
        private Boolean availability = true;
        private String role = "ANALYST";

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder specialization(String specialization) { this.specialization = specialization; return this; }
        public Builder availability(Boolean availability) { this.availability = availability; return this; }
        public Builder role(String role) { this.role = role; return this; }

        public Analyst build() {
            return new Analyst(id, name, email, specialization, availability, role);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public Boolean getAvailability() { return availability; }
    public void setAvailability(Boolean availability) { this.availability = availability; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
