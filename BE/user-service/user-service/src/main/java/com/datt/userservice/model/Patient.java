package com.datt.userservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore; // <-- 1. THÊM IMPORT NÀY
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Getter
@Setter
public class Patient {

    @Id
    private Long id;

    @Column(name = "date_of_birth")
    private LocalDate dob;

    private String insuranceNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore // <-- 2. THÊM DÒNG NÀY ĐỂ NGẮT VÒNG LẶP
    private User user;
}