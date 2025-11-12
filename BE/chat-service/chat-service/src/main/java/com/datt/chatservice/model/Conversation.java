package com.datt.chatservice.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "conversations")
public class Conversation {
    // Getters & Setters
    @Getter
    @Setter
    @Id
    private String id;
    @Setter
    @Getter
    private String appointmentId;
    @Getter
    private String doctorId;
    @Setter
    @Getter
    private String patientId;
    private List<String> messages;

    public Conversation() {}

    public Conversation(String appointmentId, String doctorId, String patientId) {
        this.appointmentId = appointmentId;
        this.doctorId = doctorId;
        this.patientId = patientId;
    }
}
