package com.datt.appointmentservice.listener;

import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static com.datt.appointmentservice.config.RabbitMQConfig.PAYMENT_QUEUE_NAME;
import com.datt.appointmentservice.dto.PaymentSuccessDto;
import com.datt.appointmentservice.model.Status;
import com.datt.appointmentservice.service.AppointmentService;

@Component
public class PaymentListener {

    @Autowired
    private AppointmentService appointmentService;

    // Lắng nghe tin nhắn từ hàng đợi (Queue). Tự khai báo queue nếu chưa tồn tại.
    @RabbitListener(queuesToDeclare = @Queue(value = PAYMENT_QUEUE_NAME, durable = "true"))
    public void handlePaymentSuccess(PaymentSuccessDto dto) {
        Long appointmentId = dto.getAppointmentId();
        System.out.println("AppointmentService: Received payment.successful for appointment ID: " + appointmentId);
        // ONLINE appointments: PENDING → CONFIRMED (đã thanh toán)
        appointmentService.updateStatus(appointmentId, Status.CONFIRMED);
    }
}