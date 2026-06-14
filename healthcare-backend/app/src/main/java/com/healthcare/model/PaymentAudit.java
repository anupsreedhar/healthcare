package com.healthcare.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payment_audit")
public class PaymentAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auditId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @Lob
    private String requestPayload;   // raw JSON/XML request

    @Lob
    private String responsePayload;  // raw JSON/XML response

    private Integer statusCode;

    @Column(length = 255)
    private String message;

    @CreationTimestamp
    private LocalDateTime timestamp;

    // Getters and setters
    // ...
}
