import api from './api';

/**
 * Booking Service - Quản lý API đặt vé khám bệnh
 */

// Lấy danh sách tất cả bác sĩ (từ user-service)
export const getAllDoctors = async () => {
  try {
    // Gọi API thực để lấy danh sách bác sĩ từ database
    const response = await api.get('/users/doctors');
    return response.data;
  } catch (error) {
    console.error('Error loading doctors from API:', error);
    
    // Fallback: Nếu API lỗi, dùng mock data tạm thời
    console.warn('Using mock data as fallback');
    const mockDoctors = [
      {
        id: 3,
        username: "doctor1",
        fullName: "BS. Nguyễn Văn A",
        email: "doctor1@example.com",
        phone: "0123456789",
        specialization: "Tim mạch",
        role: "DOCTOR"
      },
      {
        id: 4,
        username: "doctor2",
        fullName: "BS. Trần Thị B",
        email: "doctor2@example.com",
        phone: "0987654321",
        specialization: "Nội tổng quát",
        role: "DOCTOR"
      },
      {
        id: 5,
        username: "doctor3",
        fullName: "BS. Lê Văn C",
        email: "doctor3@example.com",
        phone: "0912345678",
        specialization: "Sản - Phụ khoa",
        role: "DOCTOR"
      }
    ];
    
    return mockDoctors;
  }
};

// Lấy danh sách phòng khám (giữ lại để tương thích)
export const getClinics = async () => {
  try {
    const response = await api.get('/clinics');
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tải danh sách phòng khám'
    };
  }
};

// Lấy danh sách bác sĩ theo phòng khám
export const getDoctors = async (clinicId) => {
  try {
    if (!clinicId) {
      throw new Error('Clinic ID is required');
    }
    const response = await api.get(`/clinics/${clinicId}/doctors`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tải danh sách bác sĩ'
    };
  }
};

// Lấy lịch khám của bác sĩ
export const getDoctorSchedule = async (doctorId) => {
  try {
    if (!doctorId) {
      throw new Error('Doctor ID is required');
    }
    const response = await api.get(`/doctors/${doctorId}/schedule`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tải lịch khám'
    };
  }
};

// Tạo booking/appointment mới
export const createBooking = async (payload) => {
  try {
    // Validate required fields theo backend API
    const requiredFields = ['patientId', 'doctorId', 'appointmentTime', 'type'];
    const missingFields = requiredFields.filter(field => !payload[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate appointment type
    const validTypes = ['ONLINE', 'OFFLINE'];
    if (!validTypes.includes(payload.type)) {
      throw new Error('Type phải là ONLINE hoặc OFFLINE');
    }

    // Gọi API appointments của backend - Sử dụng endpoint create-appointment
    const response = await api.post('/appointments/create-appointment', payload);
    return response.data;
  } catch (error) {
    if (error.message && !error.response) {
      // Validation error
      throw {
        status: 400,
        message: error.message
      };
    }
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tạo appointment'
    };
  }
};

// Lấy chi tiết appointment
export const getBookingDetail = async (appointmentId) => {
  try {
    if (!appointmentId) {
      throw new Error('Appointment ID is required');
    }
    const response = await api.get(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tải thông tin appointment'
    };
  }
};

// Lấy tất cả appointments
export const getAllAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể tải danh sách appointments'
    };
  }
};

// Cập nhật trạng thái appointment
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    if (!appointmentId) {
      throw new Error('Appointment ID is required');
    }
    if (!status) {
      throw new Error('Status is required');
    }
    const response = await api.put(`/appointments/${appointmentId}/status?status=${status}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể cập nhật trạng thái'
    };
  }
};

// Hủy appointment
export const cancelBooking = async (appointmentId) => {
  try {
    if (!appointmentId) {
      throw new Error('Appointment ID is required');
    }
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Không thể hủy appointment'
    };
  }
};
