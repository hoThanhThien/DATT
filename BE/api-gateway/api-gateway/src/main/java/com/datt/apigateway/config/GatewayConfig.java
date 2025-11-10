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

                // ----- Cấu hình 1: Route cho User Service (Đã có) -----
                .route("user_service_route", r -> r
                        .path("/api/v1/users/**")
                        .uri("http://user-service:8080") // Trỏ thẳng vào container
                )

                // ----- Cấu hình 2: THÊM ROUTE CHO AUTH SERVICE -----
                .route("auth_service_route", r -> r
                        // 1. NẾU đường dẫn là /api/v1/auth/...
                        .path("/api/v1/auth/**")
                        // 2. THÌ chuyển tiếp đến service tên là 'auth-service'
                        .uri("http://auth-service:8080") // Trỏ thẳng vào container
                )

                // ----- Cấu hình 3: THÊM ROUTE CHO APPOINTMENT SERVICE -----
                .route("appointment_service_route", r -> r
                        // 1. NẾU đường dẫn là /api/v1/appointment/...
                        .path("/api/v1/appointments/**")
                        // 2. THÌ chuyển tiếp đến service tên là 'appointment-service'
                        .uri("http://appointment-service:8080") // Trỏ thẳng vào container
                )
                // --------------------------------------------------

                // (Bạn sẽ thêm các service khác vào đây...)

                .build();
    }
}