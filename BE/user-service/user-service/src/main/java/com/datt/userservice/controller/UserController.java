package com.datt.userservice.controller;

import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.model.User;
import com.datt.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users") // Tiền tố chung
public class UserController {

    @Autowired
    private UserService userService; // 1. Tiêm (Inject) Service

    // 2. Tạo API Đăng ký
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            User savedUser = userService.registerUser(request);
            // 3. Trả về 200 (OK) nếu thành công
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            // 4. Trả về 400 (Bad Request) nếu thất bại (email trùng)
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Test (từ lần trước)
    @GetMapping("/hello")
    public String sayHello() {
        return "Xin chào! User Service đã chạy!";
    }
}