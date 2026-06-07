package com.healthcare.model;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters and setters
}

