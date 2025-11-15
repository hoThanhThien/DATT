package com.datt.chatservice.service;

import com.datt.chatservice.model.ChatMessage;
import com.datt.chatservice.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository messageRepo;

    public ChatService(ChatMessageRepository messageRepo) {
        this.messageRepo = messageRepo;
    }

    // Placeholder: could create/chat room metadata if needed
    public void createConversation(String appointmentId, String doctorId, String patientId) {
        // For now, chat room is derived by client via chatRoomId, so nothing to persist here.
    }

    public ChatMessage saveMessage(ChatMessage message) {
        if (message.getTimestamp() == null) {
            message.setTimestamp(LocalDateTime.now());
        }
        return messageRepo.save(message);
    }

    public List<ChatMessage> getMessages(String chatRoomId) {
        return messageRepo.findByChatRoomId(chatRoomId);
    }
}
