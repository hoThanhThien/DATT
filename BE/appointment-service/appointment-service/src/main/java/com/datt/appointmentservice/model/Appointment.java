package com.datt.appointmentservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long doctorId;
    private String reason;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "queue_number")
    private String queueNumber;
    @CreationTimestamp // Chỉ dùng cho ngày tạo
    @Column(updatable = false)
    private LocalDateTime created;

    @UpdateTimestamp // <-- ĐÃ SỬA: Chỉ dùng cái này cho ngày cập nhật
    private LocalDateTime updated;

    public Appointment() {
        this.status = Status.PENDING;
    }

    // Các hàm nghiệp vụ (Logic)
    public void createPayment() {
        System.out.println("Payment created for appointment ID: " + id);
    }

    public void startVideoCall() {
        System.out.println("Starting video call for appointment ID: " + id);
    }

    public void finish() {
        this.status = Status.COMPLETED;
    }
}