package com.datt.userservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity // 1. IntelliJ đã tự tạo
@Table(name = "users") // 2. Thêm dòng này để đặt tên bảng
@Getter // (Lombok) Tự tạo getter
@Setter // (Lombok) Tự tạo setter
public class User {

    @Id // 3. IntelliJ đã tự tạo
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 4. Thêm dòng này để ID tự tăng
    private Long id;

    // 5. Thêm các cột còn lại
    @Column(nullable = false, unique = true) // Không được trống, không được trùng
    private String email;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private String password;

    private String fullName;

    @Column(nullable = false)
    private String role; // (patient, doctor, admin)

    // 6. IntelliJ có thể đã tạo 1 constructor, bạn có thể xóa nó nếu dùng Lombok
}