package com.datt.chatservice.repository;

import com.datt.chatservice.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByConversationId(String conversationId);
}
