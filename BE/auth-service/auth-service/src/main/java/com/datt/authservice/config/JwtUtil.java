package com.datt.authservice.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import com.datt.authservice.model.User;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    // 1. Khóa bí mật (phải đủ dài)
    private final Key secretKey = Keys.hmacShaKeyFor("DayLaMotChuoiBiMatRatDaiDeMaHoaJWT_PhaiDuDai_NeuKhongSeLoi".getBytes());

    // 2. Hàm tạo Token
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().getRoleName()); // Thêm Role vào token
        claims.put("userId", user.getId()); // Thêm ID

        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + (1000 * 60 * 60 * 10); // 10 giờ

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail()) // Dùng email làm định danh
                .setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(expMillis))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
}