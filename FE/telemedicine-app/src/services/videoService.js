import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/api/v1';

// Create video call session for appointment
export const createVideoCallSession = async (videoData) => {
  try {
    const response = await axios.post(`${API_URL}/video/create-session`, videoData, {
      timeout: 10000 // 10 seconds timeout
    });
    return response.data;
  } catch (error) {
    console.error('Error creating video call session:', error);
    throw error;
  }
};

// Get video call session by appointment ID
export const getVideoSessionByAppointment = async (appointmentId) => {
  try {
    const response = await axios.get(`${API_URL}/video/session/${appointmentId}`, {
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.error('Error getting video session:', error);
    throw error;
  }
};

// Join video call
export const joinVideoCall = async (sessionId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/video/join`, {
      sessionId,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error joining video call:', error);
    throw error;
  }
};

// End video call
export const endVideoCall = async (sessionId) => {
  try {
    const response = await axios.post(`${API_URL}/video/end/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Error ending video call:', error);
    throw error;
  }
};

// Get video call token (for WebRTC)
export const getVideoCallToken = async (sessionId, userId) => {
  try {
    const response = await axios.get(`${API_URL}/video/token`, {
      params: { sessionId, userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting video call token:', error);
    throw error;
  }
};

export default {
  createVideoCallSession,
  getVideoSessionByAppointment,
  joinVideoCall,
  endVideoCall,
  getVideoCallToken
};
