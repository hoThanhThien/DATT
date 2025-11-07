package com.datt.userservice.filter;

import com.datt.userservice.config.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component // 1. Báo cho Spring biết đây là 1 "Bean"
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // 2. Tiêm công cụ JWT vào

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 3. Lấy Header "Authorization"
        final String authHeader = request.getHeader("Authorization");

        // 4. Nếu Header rỗng hoặc không phải "Bearer " -> cho đi (sẽ bị 403 sau)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 5. Lấy chuỗi Token (cắt bỏ "Bearer ")
        final String token = authHeader.substring(7);

        try {
            // 6. Xác thực Token
            if (jwtUtil.validateToken(token)) {
                // 7. Lấy Email và Role từ Token
                String email = jwtUtil.getEmailFromToken(token);
                String role = jwtUtil.getRoleFromToken(token);

                // 8. Tạo "Quyền" cho Spring Security
                List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

                // 9. Tạo "Đối tượng Xác thực"
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);

                // 10. ĐẶT VÀO CONTEXT (Bảo Spring: "User này đã được xác thực")
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Lỗi (token hết hạn, sai...) -> không làm gì, để Spring Security tự xử lý
            SecurityContextHolder.clearContext();
        }

        // 11. Cho request đi tiếp
        filterChain.doFilter(request, response);
    }
}