package com.datt.paymentservice.config;

// (Lưu ý: Đảm bảo import filter từ package của service này)
import com.datt.paymentservice.filter.JwtTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // <-- Thêm import này
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Use constructor injection to avoid null/autowiring timing issues
    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfig(JwtTokenFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(authorize -> authorize
                        // Allow CORS preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // 1. API "Tạo đơn hàng" (POST): Chỉ Bệnh nhân (PATIENT) được gọi
                        .requestMatchers(HttpMethod.POST, "/api/v1/payments/create-order").hasRole("PATIENT")

                        // 2. API "Capture" (GET): Ai cũng được vào (Vì đây là link PayPal gọi lại)
                        .requestMatchers(HttpMethod.GET, "/api/v1/payments/capture-order").permitAll()

                        // 3. Khóa tất cả các API còn lại
                        .anyRequest().authenticated()
                );

        // Thêm bộ lọc JWT
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}