import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/api/v1';

// Create chat room for appointment
export const createChatRoom = async (chatData) => {
  try {
    const response = await axios.post(`${API_URL}/chat/create-room`, chatData, {
      timeout: 10000 // 10 seconds timeout
    });
    return response.data;
  } catch (error) {
    console.error('Error creating chat room:', error);
    throw error;
  }
};

// Get chat room by appointment ID
export const getChatRoomByAppointment = async (appointmentId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/room/${appointmentId}`, {
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.error('Error getting chat room:', error);
    throw error;
  }
};

// Send message in chat room
export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/chat/send-message`, messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Get chat history
export const getChatHistory = async (roomId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/history/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting chat history:', error);
    throw error;
  }
};

export default {
  createChatRoom,
  getChatRoomByAppointment,
  sendMessage,
  getChatHistory
};
