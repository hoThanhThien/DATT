package com.datt.appointmentservice.dto;

import com.datt.appointmentservice.model.AppointmentType;
import java.time.LocalDateTime;

public class CreateAppointmentRequest {
    private String reason;
    private LocalDateTime appointmentTime;
    private AppointmentType type;

}
