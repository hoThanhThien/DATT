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

                // ----- CÁC ROUTE HTTP (REST API) - Bạn đã có -----
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

                // ----- CÁC ROUTE WEBSOCKET (BỊ THIẾU) -----

                // ----- 1. THÊM ROUTE CHO CHAT (WEBSOCKET) -----
                .route("chat_service_ws_route", r -> r
                        // 1. NẾU đường dẫn là /ws/chat/... (Kết nối WebSocket)
                        .path("/ws/chat/**")
                        // 2. THÌ chuyển tiếp đến service 'chat-service'
                        // (Lưu ý: URI bắt đầu bằng "ws://", không phải "http://")
                        .uri("ws://chat-service:8080")
                )

                // ----- 2. THÊM ROUTE CHO VIDEO (WEBSOCKET) -----
                .route("video_service_ws_route", r -> r
                        .path("/ws/video/**")
                        .uri("ws://video-service:8080") // Trỏ đến container 'video-service'
                )

                .build();
    }
}