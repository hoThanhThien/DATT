package com.datt.authservice.config;

import com.datt.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository; // Dùng repo của auth-service

    // 1. Bean Mã hóa (PHẢI GIỐNG HỆT user-service)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Bean UserDetailsService (Dạy Spring cách tìm User trong auth_db)
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            com.datt.authservice.model.User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy User: " + username));

            // Trả về đối tượng UserDetails của Spring
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getEmail())
                    .password(user.getPassword()) // Mật khẩu đã mã hóa (lấy từ auth_db)
                    .roles(user.getRole().getRoleName().replace("ROLE_", "")) // Bỏ "ROLE_"
                    .build();
        };
    }

    // 3. Bean AuthenticationManager (Dùng để xác thực)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // 4. Bean SecurityFilterChain (Mở cửa cho API Login)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // Mở cửa cho API Login (của auth-service)
                        .requestMatchers("/api/v1/auth/login").permitAll()
                        .anyRequest().authenticated() // Khóa tất cả các API khác
                );
        return http.build();
    }
}