package com.datt.paymentservice.service;

import com.datt.paymentservice.dto.PaymentSuccessDto;
// 1. IMPORT CẢ 2 LOẠI PAYMENT (của bạn và của PayPal)
import com.datt.paymentservice.model.Payment; // <-- ĐÂY LÀ MODEL CỦA BẠN
import com.datt.paymentservice.model.Status;
import com.datt.paymentservice.repository.PaymentRepository;
import com.paypal.api.payments.*; // <-- IMPORT TẤT CẢ CỦA PAYPAL
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class PaymentService {

    @Autowired
    private APIContext apiContext; // Chìa khóa PayPal
    @Autowired
    private PaymentRepository paymentRepository; // Lưu DB
    @Autowired
    private RabbitTemplate rabbitTemplate; // Gửi tin nhắn

    public static final String EXCHANGE_NAME = "payment_exchange";
    public static final String ROUTING_KEY = "payment.successful";

    // DTO này là thông tin React gửi lên
    public static record CreatePaymentRequest(
            Long appointmentId,
            Long patientId,
            Long doctorId,
            Double total,
            LocalDateTime appointmentTime,
            String appointmentType
    ) {}

    @Transactional
    public String createPayment(CreatePaymentRequest request) throws PayPalRESTException {

        // 1. Tạo chi tiết thanh toán (Dùng class của PayPal)
        Amount amount = new Amount("USD", String.format(Locale.US, "%.2f", request.total()));
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Thanh toán dịch vụ Telemedicine (ID: " + request.appointmentId() + ")");

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        // 2. SỬA LỖI: Khai báo payment này là của PayPal
        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment("sale", payer);
        payment.setTransactions(transactions); // <-- Lỗi 2 đã sửa

        // 3. Cấu hình link Callback
        RedirectUrls redirectUrls = new RedirectUrls();
        String returnUrl = String.format("http://localhost:8080/api/v1/payments/capture-order?appointmentId=%d", request.appointmentId());
        redirectUrls.setReturnUrl(returnUrl);
        redirectUrls.setCancelUrl("http://localhost:3000/payment-cancelled");

        payment.setRedirectUrls(redirectUrls); // <-- Lỗi 3 đã sửa

        // 4. Gọi PayPal để tạo
        com.paypal.api.payments.Payment createdPayment = payment.create(String.valueOf(apiContext)); // <-- Lỗi 4 đã sửa

        // 5. SỬA LỖI: Lưu giao dịch (dùng Model CỦA BẠN)
        com.datt.paymentservice.model.Payment paymentRecord = new com.datt.paymentservice.model.Payment();
        paymentRecord.setAppointmentId(request.appointmentId());
        paymentRecord.setPatientId(request.patientId());
        paymentRecord.setDoctorId(request.doctorId());
        paymentRecord.setAmount(BigDecimal.valueOf(request.total()));
        paymentRecord.setCurrency("USD");
        paymentRecord.setPaypalPaymentId(createdPayment.getId());
        paymentRecord.setStatus(Status.valueOf("CREATED")); // <-- SỬA LỖI: Dùng String, không phải Enum
        paymentRepository.save(paymentRecord);

        // 6. Trả về link thanh toán cho React
        for (Links link : createdPayment.getLinks()) { // <-- Lỗi 7 đã sửa
            if (link.getRel().equals("approval_url")) {
                return link.getHref();
            }
        }
        throw new RuntimeException("Không tạo được link thanh toán PayPal.");
    }

    @Transactional
    public String capturePayment(String paymentId, String payerId, Long appointmentId) throws PayPalRESTException {

        // 1. Tìm giao dịch (Model của bạn) trong DB
        Payment paymentRecord = paymentRepository.findByPaypalPaymentId(paymentId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giao dịch"));

        // 2. SỬA LỖI: Tạo đối tượng payment (của PayPal) để thực thi
        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);

        // 3. Gọi PayPal để "Thu tiền"
        com.paypal.api.payments.Payment capturedPayment = payment.execute(String.valueOf(apiContext), paymentExecute); // <-- Lỗi 9 đã sửa

        if (capturedPayment.getState().equals("approved")) { // <-- Lỗi 10 đã sửa
            // 4. THANH TOÁN THÀNH CÔNG

            // 5. Cập nhật DB (Model của bạn)
            paymentRecord.setStatus(Status.valueOf("COMPLETED")); // <-- SỬA LỖI: Dùng String
            paymentRecord.setPaypalPayerId(payerId); // <-- SỬA LỖI: PayerID là String
            paymentRepository.save(paymentRecord);

            // 6. Lấy thông tin từ DB để gửi tin nhắn
            // (Chúng ta cần lấy appointmentTime từ đâu đó, tạm thời để null)
            PaymentSuccessDto dto = new PaymentSuccessDto(
                    paymentRecord.getId(),
                    appointmentId,
                    paymentRecord.getPatientId(),
                    paymentRecord.getDoctorId(),
                    paymentRecord.getAmount(),
                    null, // TODO: Cần lấy appointmentTime từ request
                    "ONLINE"
            );

            // 7. GỬI TIN NHẮN ĐỒNG BỘ QUA RABBITMQ
            System.out.println("PaymentService: Gửi tin nhắn 'payment.successful' cho Appointment ID: " + appointmentId);
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, dto);

            return "Thanh toán thành công!";
        } else {
            paymentRecord.setStatus(Status.valueOf("FAILED")); // <-- SỬA LỖI: Dùng String
            paymentRepository.save(paymentRecord);
            throw new RuntimeException("Thanh toán PayPal không thành công.");
        }
    }
}