package com.datt.chatservice.listener;

import com.datt.chatservice.config.RabbitMQConfig;
import com.datt.chatservice.dto.PaymentSuccessDto;
import com.datt.chatservice.model.ChatMessage;
import com.datt.chatservice.repository.ChatMessageRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PaymentListener {

    @Autowired
    private ChatMessageRepository chatMessageRepository; // Dùng để lưu tin nhắn (hoặc ChatRoom)

    // 1. Lắng nghe tin nhắn từ hàng đợi "payment_success_chat_queue"
    @RabbitListener(queues = RabbitMQConfig.PAYMENT_QUEUE_NAME)
    public void handlePaymentSuccess(PaymentSuccessDto paymentDto) {

        System.out.println("ChatService: Đã nhận được tin nhắn thanh toán thành công cho Appointment ID: "
                + paymentDto.getAppointmentId());

        // 2. TẠO PHÒNG CHAT (THEO YÊU CẦU CỦA BẠN)
        // (Đây là logic ví dụ, bạn có thể tạo 1 Model "ChatRoom" riêng)
        // Hiện tại, chúng ta sẽ gửi 1 tin nhắn chào mừng (welcome message)
        // để "kích hoạt" phòng chat (dùng chung AppointmentId làm ChatRoomId)

        String chatRoomId = String.valueOf(paymentDto.getAppointmentId());

        ChatMessage welcomeMessage = new ChatMessage();
        welcomeMessage.setChatRoomId(chatRoomId);
        welcomeMessage.setSenderId(0L); // (0L = Hệ thống)
        welcomeMessage.setRecipientId(paymentDto.getPatientId());
        welcomeMessage.setContent("Thanh toán thành công. Phòng chat của bạn đã sẵn sàng.");
        welcomeMessage.setTimestamp(LocalDateTime.now());

        // 3. Lưu tin nhắn chào mừng vào MongoDB (chat_db)
        chatMessageRepository.save(welcomeMessage);

        System.out.println("ChatService: Đã tạo tin nhắn chào mừng cho phòng chat: " + chatRoomId);

        // (Bạn cũng có thể dùng SimpMessagingTemplate để "đẩy" tin nhắn này
        // về cho Bệnh nhân ngay lập tức nếu họ đang online)
    }
}