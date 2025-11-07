package com.datt.userservice.config; // <-- Package của user-service

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    // 1. Khóa bí mật (PHẢI GIỐNG HỆT auth-service)
    private final Key secretKey = Keys.hmacShaKeyFor("DayLaMotChuoiBiMatRatDaiDeMaHoaJWT_PhaiDuDai_NeuKhongSeLoi".getBytes());

    // 2. Hàm lấy Email từ Token
    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // 3. Hàm lấy Role từ Token
    public String getRoleFromToken(String token) {
        return (String) getClaims(token).get("role");
    }

    // 4. Hàm kiểm tra Token có hợp lệ không
    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    // --- Các hàm hỗ trợ (private) ---

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getClaimFromToken(token, Claims::getExpiration);
        return expiration.before(new Date());
    }
}