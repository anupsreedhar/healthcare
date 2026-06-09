package com.healthcare.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "patients")
public class Patient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters and setters
}

