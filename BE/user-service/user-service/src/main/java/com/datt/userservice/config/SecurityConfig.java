package com.datt.userservice.config;

// 1. IMPORT CÁC THƯ VIỆN CẦN THIẾT
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // 2. IMPORT FILTER MẶC ĐỊNH
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.datt.userservice.filter.JwtTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired // <-- 3. TIÊM (INJECT) BỘ LỌC JWT CỦA BẠN
    private JwtTokenFilter jwtTokenFilter;

    // Bean mã hóa mật khẩu (Giữ nguyên, UserService cần dùng)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean chuỗi lọc bảo mật (Đã cập nhật)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS with the CorsConfigurationSource bean defined below
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(authorize -> authorize

                        // Mở cửa cho Đăng ký và Hello (để test)
                        .requestMatchers("/api/v1/users/register").permitAll()
                        .requestMatchers("/api/v1/users/hello").permitAll()

                        // 4. KHÓA LẠI: Chỉ ADMIN mới được vào
                        .requestMatchers("/api/v1/users/admin/**").hasRole("ADMIN")

                        // Khóa tất cả các API còn lại
                        .anyRequest().authenticated()
                );

        // 5. ----- DÒNG QUAN TRỌNG NHẤT -----
        // Thêm bộ lọc JWT của bạn vào TRƯỚC bộ lọc Username/Password
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allow the FE dev server origin (Vite default port 5173). Adjust if you run FE elsewhere.
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}