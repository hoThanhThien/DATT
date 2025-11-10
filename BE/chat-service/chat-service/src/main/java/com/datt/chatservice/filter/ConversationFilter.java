package com.datt.chatservice.filter;

import com.datt.chatservice.dto.response.ConversationResponse;
import com.datt.chatservice.model.Conversation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ConversationFilter {
    ConversationResponse toConversationResponse(Conversation conversation);

    List<ConversationResponse> toConversationResponseList(List<Conversation> conversations);
}