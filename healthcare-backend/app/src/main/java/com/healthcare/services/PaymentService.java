package com.healthcare.services;

import com.healthcare.model.Payment;
import com.healthcare.model.PaymentAudit;
import com.healthcare.repository.PaymentRepository;
import com.healthcare.repository.PaymentAuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentAuditRepository paymentAuditRepository;

    /**
     * Initiate a payment (skeleton).
     * Later we’ll accept a PaymentRequestDTO instead of raw params.
     */
    public Payment initiatePayment(Payment payment) {
        // Save payment with INITIATED status
        payment.setStatus("INITIATED");
        Payment savedPayment = paymentRepository.save(payment);

        // Create audit record (mock request/response for now)
        PaymentAudit audit = new PaymentAudit();
        audit.setPayment(savedPayment);
        audit.setRequestPayload("{mockRequest}");
        audit.setResponsePayload("{mockResponse}");
        audit.setStatusCode(200);
        audit.setMessage("Payment initiated successfully (mock)");
        paymentAuditRepository.save(audit);

        return savedPayment;
    }

    /**
     * Update payment status (SUCCESS, FAILED, REFUNDED).
     */
    public Payment updatePaymentStatus(Long paymentId, String status, String transactionReference) {
        Optional<Payment> optionalPayment = paymentRepository.findById(paymentId);
        if (optionalPayment.isEmpty()) {
            throw new RuntimeException("Payment not found");
        }

        Payment payment = optionalPayment.get();
        payment.setStatus(status);
        payment.setTransactionReference(transactionReference);
        return paymentRepository.save(payment);
    }

    /**
     * Retrieve payment by ID.
     */
    public Payment getPayment(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    /**
     * Retrieve audits for a payment.
     */
    public java.util.List<PaymentAudit> getPaymentAudits(Long paymentId) {
        return paymentAuditRepository.findByPayment_PaymentId(paymentId);
    }
}
