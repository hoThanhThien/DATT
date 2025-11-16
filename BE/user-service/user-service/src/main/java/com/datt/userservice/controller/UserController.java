package com.datt.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datt.userservice.dto.DoctorRequest; // <-- 1. Đảm bảo import ĐÚNG
import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.model.User;
import com.datt.userservice.service.UserService;

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

    // API Lấy danh sách tất cả bác sĩ
    @GetMapping("/doctors") // Khớp với: /api/v1/users/doctors
    public ResponseEntity<?> getAllDoctors() {
        try {
            java.util.List<com.datt.userservice.dto.DoctorDTO> doctors = userService.findAllDoctors();
            return ResponseEntity.ok(doctors);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Không thể lấy danh sách bác sĩ: " + e.getMessage());
        }
    }

    // API Lấy thông tin user hiện tại (từ JWT token)
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            // Lấy email từ JWT token (đã được JwtTokenFilter set vào SecurityContext)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            
            // Tìm user trong DB
            User user = userService.findUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Không tìm thấy thông tin user");
        }
    }
}