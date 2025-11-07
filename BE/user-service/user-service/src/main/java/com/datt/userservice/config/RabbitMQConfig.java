package com.datt.userservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory; // <-- THÊM
import org.springframework.amqp.rabbit.connection.ConnectionFactory; // <-- THÊM
import org.springframework.amqp.rabbit.core.RabbitTemplate; // <-- THÊM
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter; // <-- THÊM
import org.springframework.amqp.support.converter.MessageConverter; // <-- THÊM
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "user_exchange";
    public static final String QUEUE_NAME = "user_created_queue";
    public static final String ROUTING_KEY = "user.created";

    @Bean
    TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    Queue queue() {
        return new Queue(QUEUE_NAME, true);
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
    }

    // 1. BEAN CHUYỂN ĐỔI JSON (Cần cho cả Gửi và Nhận)
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // 2. BEAN GỬI (Dùng cho user-service)
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }

    // 3. BEAN NHẬN (Dùng cho auth-service)
    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(
            ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jsonMessageConverter()); // <-- RẤT QUAN TRỌNG CHO BÊN NHẬN
        return factory;
    }
}