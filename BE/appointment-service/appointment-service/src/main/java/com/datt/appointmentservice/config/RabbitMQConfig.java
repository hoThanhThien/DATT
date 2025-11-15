package com.datt.appointmentservice.config;

// 1. IMPORT CÁC CLASS CẦN THIẾT
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // --- (A) CẤU HÌNH GỬI TIN (Bạn đã có) ---
    // (Dùng để GỬI tin nhắn "appointment.scheduled" khi đặt lịch OFFLINE)
    @Bean
    TopicExchange appointmentExchange() {
        return new TopicExchange("appointment_exchange");
    }

    // --- (B) CẤU HÌNH NHẬN TIN (PHẦN BỊ THIẾU) ---
    // (Dùng để NHẬN tin nhắn "payment.successful" từ payment-service)

    public static final String PAYMENT_EXCHANGE_NAME = "payment_exchange";
    public static final String PAYMENT_QUEUE_NAME = "payment_success_appointment_queue"; // <-- Tên hàng đợi bị thiếu
    public static final String PAYMENT_ROUTING_KEY = "payment.successful";

    @Bean
    TopicExchange paymentExchange() {
        // 2. "Biết" về exchange của payment-service
        return new TopicExchange(PAYMENT_EXCHANGE_NAME);
    }

    @Bean
    Queue paymentQueue() {
        // 3. TẠO HÀNG ĐỢI (Queue)
        return new Queue(PAYMENT_QUEUE_NAME, true);
    }

    @Bean
    Binding paymentBinding(Queue paymentQueue, TopicExchange paymentExchange) {
        // 4. Kết nối (Bind) hàng đợi này với exchange
        return BindingBuilder.bind(paymentQueue).to(paymentExchange).with(PAYMENT_ROUTING_KEY);
    }

    // --- (C) CẤU HÌNH MESSAGE CONVERTER (Bạn đã có) ---
    // (Đảm bảo bạn có 3 Bean này để xử lý JSON DTO)
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jsonMessageConverter());
        return factory;
    }
}