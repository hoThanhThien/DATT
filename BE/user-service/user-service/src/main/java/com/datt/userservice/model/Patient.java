package com.datt.userservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Getter
@Setter
public class Patient {

    @Id // 1. Đây là Khóa chính
    private Long id; // KHÔNG dùng @GeneratedValue

    @Column(name = "date_of_birth")
    private LocalDate dob; // (Từ sơ đồ: dob)

    private String insuranceNumber; // (Từ sơ đồ: insuranceNumber)

    // ----- PHẦN QUAN TRỌNG NHẤT -----
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // 2. Báo cho JPA: "Hãy dùng ID của 'user' làm ID cho tôi"
    @JoinColumn(name = "user_id") // 3. Tên cột khóa ngoại
    private User user;
}