package com.datt.chatservice.service;

import com.datt.chatservice.model.Conversation;
import com.datt.chatservice.model.Message;
import com.datt.chatservice.repository.ChatRepository;
import com.datt.chatservice.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatRepository conversationRepo;
    private final MessageRepository messageRepo;

    public ChatService(ChatRepository conversationRepo, MessageRepository messageRepo) {
        this.conversationRepo = conversationRepo;
        this.messageRepo = messageRepo;
    }

    public Conversation createConversation(String appointmentId, String doctorId, String patientId) {
        Conversation conversation = new Conversation(appointmentId, doctorId, patientId);
        return conversationRepo.save(conversation);
    }

    public Message saveMessage(Message message) {
        return messageRepo.save(message);
    }

    public List<Message> getMessages(String conversationId) {
        return messageRepo.findByConversationId(conversationId);
    }
}
