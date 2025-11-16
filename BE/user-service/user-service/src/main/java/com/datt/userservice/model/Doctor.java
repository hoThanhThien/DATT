package com.datt.userservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore; // <-- 1. THÊM IMPORT NÀY

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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

    @Column(name = "consultation_fee")
    private Double consultationFee; // Giá khám (VND)

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore // <-- 2. THÊM DÒNG NÀY ĐỂ NGẮT VÒNG LẶP
    private User user;
}