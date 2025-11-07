package com.datt.userservice.controller;

import com.datt.userservice.dto.DoctorRequest; // <-- 1. THÊM IMPORT NÀY
import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.model.User;
import com.datt.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // <-- 2. THÊM IMPORT NÀY
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users") // Tiền tố chung
public class UserController {

    @Autowired
    private UserService userService; // Tiêm (Inject) Service

    // API Đăng ký Bệnh nhân (Đã có)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            User savedUser = userService.registerUser(request);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Đồng bộ thủ công (Đã có)
    @PostMapping("/admin/sync/{userId}")
    public ResponseEntity<String> forceSyncUser(@PathVariable Long userId) {
        try {
            userService.forceSyncUser(userId);
            return ResponseEntity.ok("Đã gửi yêu cầu đồng bộ user ID " + userId);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ----- 3. API TẠO BÁC SĨ (PHẦN BẠN BỊ THIẾU) -----
    @PostMapping("/admin/create-doctor")
    public ResponseEntity<?> createDoctor(@RequestBody DoctorRequest request) {
        try {
            User savedUser = userService.createDoctor(request);
            // Trả về 200 (OK) nếu thành công
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            // Trả về 400 (Bad Request) nếu thất bại (email trùng)
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Test (Đã có)
    @GetMapping("/hello")
    public String sayHello() {
        return "Xin chào! User Service đã chạy!";
    }
}