package com.datt.userservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore; // <-- 1. THÊM IMPORT NÀY
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "doctors")
@Getter
@Setter
public class Doctor {

    @Id
    private Long id;

    private String specialization;

    private int experienceYears;

    private String workSchedule;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore // <-- 2. THÊM DÒNG NÀY ĐỂ NGẮT VÒNG LẶP
    private User user;
}