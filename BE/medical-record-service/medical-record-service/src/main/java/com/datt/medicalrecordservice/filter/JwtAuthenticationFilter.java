package com.datt.medicalrecordservice.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader("Authorization");

        // Giả lập kiểm tra token, thực tế sẽ xác minh JWT
        if (token != null && token.startsWith("Bearer ")) {
            // validate token...
        }

        chain.doFilter(request, response);
    }
}
