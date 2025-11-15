package com.datt.chatservice.config;

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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // --- (A) CẤU HÌNH NHẬN TIN TỪ USER-SERVICE ---
    public static final String USER_EXCHANGE_NAME = "user_exchange";
    public static final String USER_QUEUE_NAME = "user_created_queue";
    public static final String USER_ROUTING_KEY = "user.created";

    @Bean
    TopicExchange userExchange() {
        return new TopicExchange(USER_EXCHANGE_NAME);
    }
    @Bean
    Queue userQueue() {
        return new Queue(USER_QUEUE_NAME, true);
    }
    @Bean
    Binding userBinding(@Qualifier("userQueue") Queue queue,
                        @Qualifier("userExchange") TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(USER_ROUTING_KEY);
    }


    // --- (B) CẤU HÌNH NHẬN TIN TỪ PAYMENT-SERVICE (PHẦN BỊ THIẾU) ---
    public static final String PAYMENT_EXCHANGE_NAME = "payment_exchange";
    public static final String PAYMENT_QUEUE_NAME = "payment_success_chat_queue"; // <-- Tên hàng đợi bị thiếu
    public static final String PAYMENT_ROUTING_KEY = "payment.successful";

    @Bean
    TopicExchange paymentExchange() {
        return new TopicExchange(PAYMENT_EXCHANGE_NAME);
    }

    @Bean
    Queue paymentQueue() {
        // 2. TẠO HÀNG ĐỢI (Queue)
        return new Queue(PAYMENT_QUEUE_NAME, true);
    }

    @Bean
    Binding paymentBinding(@Qualifier("paymentQueue") Queue queue,
                           @Qualifier("paymentExchange") TopicExchange exchange) {
        // 3. Kết nối (Bind) hàng đợi này với exchange
        return BindingBuilder.bind(queue).to(exchange).with(PAYMENT_ROUTING_KEY);
    }

    // --- (C) CẤU HÌNH MESSAGE CONVERTER (BẮT BUỘC) ---
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