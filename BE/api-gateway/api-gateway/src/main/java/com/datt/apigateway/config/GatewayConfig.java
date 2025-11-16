package com.datt.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()

                .route("user_service_http_route", r -> r
                        .path("/api/v1/users/**")
                        .uri("http://user-service:8080")
                )
                .route("auth_service_http_route", r -> r
                        .path("/api/v1/auth/**")
                        .uri("http://auth-service:8080")
                )
                .route("appointment_service_http_route", r -> r
                        .path("/api/v1/appointments/**")
                        .uri("http://appointment-service:8080")
                )
                .route("medical_record_service_http_route", r -> r
                        .path("/api/v1/medical-records/**")
                        .uri("http://medical-record-service:8080")
                )

                // (Route HTTP cho chat, nếu có API lấy lịch sử)
                .route("chat_service_http_route", r -> r
                        .path("/api/v1/chat/**")
                        .uri("http://chat-service:8080")
                )




                .route("chat_service_ws_route", r -> r

                        .path("/ws/chat/**")


                        .uri("ws://chat-service:8080")
                )


                .route("video_service_ws_route", r -> r
                        .path("/ws/video/**")
                        .uri("ws://video-service:8080")
                )
                .route("payment_service_route", r -> r
                        .path("/api/v1/payments/**")
                        .uri("http://payment-service:8080")
                )

                .build();

    }
}