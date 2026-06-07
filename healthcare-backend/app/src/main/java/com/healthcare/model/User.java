package com.healthcare.model;


import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String passwordHash;
    private String role; // "PATIENT" or "DOCTOR"

    // getters and setters
}
