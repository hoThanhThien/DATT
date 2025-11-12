package com.datt.chatservice.repository;

import com.datt.chatservice.model.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatRepository extends MongoRepository<Conversation, String> {
    Optional<Conversation> findByAppointmentId(String appointmentId);
}
