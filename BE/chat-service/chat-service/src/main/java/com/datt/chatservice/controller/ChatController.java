package com.datt.chatservice.controller;

import com.datt.chatservice.model.Message;
import com.datt.chatservice.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // Khi AppointmentService tạo lịch hẹn mới, gọi API này
    @PostMapping("/conversation")
    public void createConversation(@RequestParam String appointmentId,
                                   @RequestParam String doctorId,
                                   @RequestParam String patientId) {
        chatService.createConversation(appointmentId, doctorId, patientId);
    }

    // Lấy toàn bộ tin nhắn
    @GetMapping("/messages/{conversationId}")
    public List<Message> getMessages(@PathVariable String conversationId) {
        return chatService.getMessages(conversationId);
    }

    // WebSocket gửi/nhận tin nhắn
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public Message sendMessage(Message message) {
        return chatService.saveMessage(message);
    }
}
