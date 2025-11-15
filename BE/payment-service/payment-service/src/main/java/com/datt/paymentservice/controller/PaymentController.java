package com.datt.paymentservice.controller;

import com.datt.paymentservice.service.PaymentService;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // API 1: React gọi để lấy link thanh toán PayPal
    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody PaymentService.CreatePaymentRequest request) {
        try {
            String approvalLink = paymentService.createPayment(request);
            // Trả về link (chuỗi) cho React
            return ResponseEntity.ok(approvalLink);
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    // API 2: PayPal gọi (Callback) sau khi thanh toán thành công
    @GetMapping("/capture-order")
    public ResponseEntity<String> captureOrder(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId,
            @RequestParam("appointmentId") Long appointmentId) {
        try {
            String result = paymentService.capturePayment(paymentId, payerId, appointmentId);
            // TODO: Trả về một trang HTML "Thanh toán thành công" đẹp
            return ResponseEntity.ok(result);
        } catch (PayPalRESTException e) {
            // TODO: Trả về trang "Thanh toán thất bại"
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}