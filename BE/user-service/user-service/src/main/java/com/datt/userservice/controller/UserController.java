package com.datt.userservice.controller;

import com.datt.userservice.dto.DoctorRequest;
import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.model.User;
import com.datt.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // <-- 1. Đảm bảo import ĐÚNG

@RestController // <-- 2. Phải là @RestController
@RequestMapping("/api/v1/users") // <-- 3. Tiền tố chung phải là "/api/v1/users"
public class UserController {

    @Autowired
    private UserService userService;

    // API Đăng ký Bệnh nhân
    @PostMapping("/register") // Khớp với: /api/v1/users/register
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            User savedUser = userService.registerUser(request);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Đồng bộ thủ công
    @PostMapping("/admin/sync/{userId}") // Khớp với: /api/v1/users/admin/sync/1
    public ResponseEntity<String> forceSyncUser(@PathVariable Long userId) {
        try {
            userService.forceSyncUser(userId);
            return ResponseEntity.ok("Đã gửi yêu cầu đồng bộ user ID " + userId);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // API TẠO BÁC SĨ (Admin)
    @PostMapping("/admin/create-doctor") // <-- 4. Phải có hàm này
    public ResponseEntity<?> createDoctor(@RequestBody DoctorRequest request) {
        try {
            User savedUser = userService.createDoctor(request);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Test (Hello)
    @GetMapping("/hello") // Khớp với: /api/v1/users/hello
    public String sayHello() {
        return "Xin chào! User Service đã chạy!";
    }
}