import api from './api';

/**
 * Chat Service - Quản lý API liên quan đến Chat
 */

// Tạo conversation mới (được gọi khi tạo appointment)
export const createConversation = async (appointmentId, doctorId, patientId) => {
  const response = await api.post('/chat/conversation', null, {
    params: {
      appointmentId,
      doctorId,
      patientId
    }
  });
  return response.data;
};

// Lấy tất cả tin nhắn trong 1 chat room
export const getMessages = async (chatRoomId) => {
  const response = await api.get(`/chat/messages/${chatRoomId}`);
  return response.data;
};

// Note: WebSocket sendMessage được xử lý qua STOMP client, không qua axios
// Xem thêm tài liệu WebSocket integration cho React
