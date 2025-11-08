package com.datt.appointmentservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reason;

    private LocalDateTime appointmentTime;

    @Enumerated(EnumType.STRING)
    private AppointmentType type;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime created;
    private LocalDateTime updated;

    // Constructors
    public Appointment() {
        this.created = LocalDateTime.now();
        this.status = Status.PENDING;
    }

    public Appointment(String reason, LocalDateTime appointmentTime, AppointmentType type) {
        this.reason = reason;
        this.appointmentTime = appointmentTime;
        this.type = type;
        this.created = LocalDateTime.now();
        this.status = Status.PENDING;
    }

    // Domain methods (the ones from the class diagram)
    public void createPayment() {
        // Logic giả lập tạo thanh toán cho buổi hẹn
        System.out.println("Payment created for appointment ID: " + id);
    }

    public void startVideoCall() {
        // Logic giả lập bắt đầu cuộc gọi video
        System.out.println("Starting video call for appointment ID: " + id);
    }

    public void finish() {
        this.status = Status.COMPLETED;
        this.updated = LocalDateTime.now();
    }

    // Getters & Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getReason() { return reason; }

    public void setReason(String reason) { this.reason = reason; }

    public LocalDateTime getAppointmentTime() { return appointmentTime; }

    public void setAppointmentTime(LocalDateTime appointmentTime) { this.appointmentTime = appointmentTime; }

    public AppointmentType getType() { return type; }

    public void setType(AppointmentType type) { this.type = type; }

    public Status getStatus() { return status; }

    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getCreated() { return created; }

    public void setCreated(LocalDateTime created) { this.created = created; }

    public LocalDateTime getUpdated() { return updated; }

    public void setUpdated(LocalDateTime updated) { this.updated = updated; }
}
