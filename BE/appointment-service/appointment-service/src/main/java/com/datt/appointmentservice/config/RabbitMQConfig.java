package com.datt.appointmentservice.config;

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


    @Bean
    TopicExchange appointmentExchange() {
        return new TopicExchange("appointment_exchange");
    }


    public static final String PAYMENT_EXCHANGE_NAME = "payment_exchange";
    public static final String PAYMENT_QUEUE_NAME = "payment_success_appointment_queue";
    public static final String PAYMENT_ROUTING_KEY = "payment.successful";

    @Bean
    TopicExchange paymentExchange() {

        return new TopicExchange(PAYMENT_EXCHANGE_NAME);
    }

    @Bean
    Queue paymentQueue() {

        return new Queue(PAYMENT_QUEUE_NAME, true);
    }

    @Bean
    Binding paymentBinding(Queue paymentQueue, TopicExchange paymentExchange) {

        return BindingBuilder.bind(paymentQueue).to(paymentExchange).with(PAYMENT_ROUTING_KEY);
    }

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