package com.datt.authservice.repository;

import com.datt.authservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Hàm quan trọng nhất để tìm user khi đăng nhập
    Optional<User> findByEmail(String email);
    // (Bạn có thể thêm findByPhoneNumber sau)
}