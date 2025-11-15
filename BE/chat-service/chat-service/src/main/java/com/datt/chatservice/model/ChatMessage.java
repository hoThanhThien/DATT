package com.datt.chatservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "messages") // Tên "bảng" (collection) trong 'chat_db'
public class ChatMessage {

    @Id
    private String id; // MongoDB dùng String ID

    private String chatRoomId; // ID của phòng chat (ví dụ: "user1-doctor2")
    private Long senderId;
    private Long recipientId;
    private String content;

    // (Chúng ta sẽ dùng @CreatedDate để tự động gán)
    private LocalDateTime timestamp;
}