package com.datt.appointmentservice.dto;

import com.datt.appointmentservice.model.AppointmentType;
import com.datt.appointmentservice.model.Status;
import java.time.LocalDateTime;

public class AppointmentDTO {
    private Long id;
    private String reason;
    private LocalDateTime appointmentTime;
    private AppointmentType type;
    private Status status;
    private LocalDateTime created;
    private LocalDateTime updated;


    public AppointmentDTO() {
    }

    public AppointmentDTO(Long id, String reason, LocalDateTime appointmentTime,
                          AppointmentType type, Status status, LocalDateTime created, LocalDateTime updated) {
        this.id = id;
        this.reason = reason;
        this.appointmentTime = appointmentTime;
        this.type = type;
        this.status = status;
        this.created = created;
    }
}