package com.datt.authservice.controller;

import com.datt.authservice.config.JwtUtil;
import com.datt.authservice.dto.LoginRequest;
import com.datt.authservice.dto.LoginResponse;
import com.datt.authservice.model.User;
import com.datt.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Thử xác thực (dùng UserDetailsService đã cấu hình)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            // 2. Nếu thành công, lấy chi tiết User (từ auth_db)
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Lỗi không xác định"));

            // 3. Tạo Token
            String token = jwtUtil.generateToken(user);

            // 4. Trả về Token và Role
            return ResponseEntity.ok(new LoginResponse(token, user.getRole().getRoleName()));

        } catch (Exception e) {
            // 5. Nếu sai pass hoặc user, trả về lỗi 401
            return ResponseEntity.status(401).body("Sai email hoặc mật khẩu");
        }
    }
}