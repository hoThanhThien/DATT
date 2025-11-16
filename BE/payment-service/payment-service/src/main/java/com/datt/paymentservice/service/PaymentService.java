package com.datt.paymentservice.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.datt.paymentservice.dto.PaymentSuccessDto;
import com.datt.paymentservice.model.Payment;
import com.datt.paymentservice.model.Status;
import com.datt.paymentservice.repository.PaymentRepository;
import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

@Service
public class PaymentService {

    // Tỷ giá VND sang USD
    private static final double VND_TO_USD_RATE = 26000.0;

    @Autowired
    private APIContext apiContext;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private RestTemplate restTemplate;

    public static final String EXCHANGE_NAME = "payment_exchange";
    public static final String ROUTING_KEY = "payment.successful";
    
    // Chat and Video service URLs
    private static final String CHAT_SERVICE_URL = "http://localhost:8085/api/v1/chat";
    private static final String VIDEO_SERVICE_URL = "http://localhost:8086/api/v1/video";

    public record CreatePaymentRequest(
            Long appointmentId,
            Long patientId,
            Long doctorId,
            Double total,
            LocalDateTime appointmentTime,
            String appointmentType
    ) {}

    @Transactional
    public String createPayment(CreatePaymentRequest request) throws PayPalRESTException {

        // Convert VND to USD
        double amountUSD = request.total() / VND_TO_USD_RATE;
        
        Amount amount = new Amount("USD", String.format(Locale.US, "%.2f", amountUSD));
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Thanh toán dịch vụ Telemedicine (ID: " + request.appointmentId() + ")");

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment("sale", payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        String returnUrl = String.format("http://localhost:8080/api/v1/payments/capture-order?appointmentId=%d", request.appointmentId());
        redirectUrls.setReturnUrl(returnUrl);
        redirectUrls.setCancelUrl("http://localhost:3000/payment-cancelled");

        payment.setRedirectUrls(redirectUrls);

        com.paypal.api.payments.Payment createdPayment = payment.create(apiContext);

        com.datt.paymentservice.model.Payment paymentRecord = new com.datt.paymentservice.model.Payment();
        paymentRecord.setAppointmentId(request.appointmentId());
        paymentRecord.setPatientId(request.patientId());
        paymentRecord.setDoctorId(request.doctorId());
        paymentRecord.setAmount(BigDecimal.valueOf(amountUSD)); // Lưu USD vào DB
        paymentRecord.setCurrency("USD");
        paymentRecord.setPaypalPaymentId(createdPayment.getId());

        // 1. Use Status enum instead of String
        paymentRecord.setStatus(Status.PENDING);

        paymentRepository.save(paymentRecord);

        for (Links link : createdPayment.getLinks()) {
            if (link.getRel().equals("approval_url")) {
                return link.getHref();
            }
        }
        throw new RuntimeException("Không tạo được link thanh toán PayPal.");
    }

    @Transactional
    public String capturePayment(String paymentId, String payerId, Long appointmentId) throws PayPalRESTException {

        Payment paymentRecord = paymentRepository.findByPaypalPaymentId(paymentId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch"));

        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);

        com.paypal.api.payments.Payment capturedPayment = payment.execute(apiContext, paymentExecute);

        if (capturedPayment.getState().equals("approved")) {

            // 2. Use Status enum
            paymentRecord.setStatus(Status.COMPLETED);
            paymentRecord.setPaypalPayerId(payerId);
            paymentRepository.save(paymentRecord);

            LocalDateTime apptTime = LocalDateTime.now(); // (Tạm thời)

            PaymentSuccessDto dto = new PaymentSuccessDto(
                    paymentRecord.getId(),
                    appointmentId,
                    paymentRecord.getPatientId(),
                    paymentRecord.getDoctorId(),
                    paymentRecord.getAmount(),
                    apptTime,
                    "ONLINE"
            );

            System.out.println("PaymentService: Gửi tin nhắn 'payment.successful' cho Appointment ID: " + appointmentId);
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, dto);

            // Tạo chat room và video session ngay sau khi thanh toán thành công
            createChatRoomAndVideoSession(appointmentId, paymentRecord.getPatientId(), paymentRecord.getDoctorId(), apptTime);

            return "Thanh toán thành công!";
        } else {
            // 3. Use Status enum
            paymentRecord.setStatus(Status.FAILED);
            paymentRepository.save(paymentRecord);
            throw new RuntimeException("Thanh toán PayPal không thành công.");
        }
    }
}