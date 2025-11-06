package com.datt.userservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "doctors")
@Getter
@Setter
public class Doctor {

    @Id // 1. Khóa chính (sẽ giống hệt user_id)
    private Long id;

    private String specialization; // (Từ sơ đồ: specialization)

    private int experienceYears; // (Từ sơ đồ: experienceYears)

    private String workSchedule; // (Từ sơ đồ: workSchedule)

    // ----- PHẦN QUAN TRỌNG NHẤT -----
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // 2. Báo JPA dùng ID của 'user' làm ID
    @JoinColumn(name = "user_id") // 3. Tên cột khóa ngoại
    private User user;
}