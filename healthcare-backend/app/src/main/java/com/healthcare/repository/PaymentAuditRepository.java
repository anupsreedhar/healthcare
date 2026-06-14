package com.healthcare.repository;

import com.healthcare.model.PaymentAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentAuditRepository extends JpaRepository<PaymentAudit, Long> {

    // Find all audits for a given payment
    List<PaymentAudit> findByPayment_PaymentId(Long paymentId);
}
