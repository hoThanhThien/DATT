package com.datt.userservice.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.datt.userservice.config.RabbitMQConfig;
import com.datt.userservice.dto.DoctorRequest;
import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.dto.UserSyncDto;
import com.datt.userservice.model.Doctor;
import com.datt.userservice.model.Patient;
import com.datt.userservice.model.Role;
import com.datt.userservice.model.User;
import com.datt.userservice.repository.DoctorRepository;
import com.datt.userservice.repository.PatientRepository;
import com.datt.userservice.repository.RoleRepository;
import com.datt.userservice.repository.UserRepository;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private RabbitTemplate rabbitTemplate; // Tiêm RabbitTemplate

    // ------------------------------------------------------------------------
    // 1. API CÔNG KHAI: ĐĂNG KÝ BỆNH NHÂN (REGISTER)
    // ------------------------------------------------------------------------
    @Transactional
    public User registerUser(RegisterRequest request) {

        // Kiểm tra Email/SĐT
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Lỗi: Email đã được sử dụng!");
        }
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Lỗi: Số điện thoại đã được sử dụng!");
        }

        // Tìm ROLE_PATIENT
        Role userRole = roleRepository.findByRoleName("ROLE_PATIENT")
                .orElseThrow(() -> new RuntimeException("Lỗi: Role 'ROLE_PATIENT' chưa được tạo trong database!"));

        // Tạo User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Mã hóa Pass
        user.setRole(userRole);
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);

        // Tạo Patient (sử dụng @MapsId)
        Patient patient = new Patient();
        patient.setUser(savedUser); // Liên kết (quan trọng!)
        patient.setDob(request.getDob());
        patient.setInsuranceNumber(request.getInsuranceNumber());
        Patient savedPatient = patientRepository.save(patient);

        // Thiết lập liên kết ngược (để JSON response hiển thị)
        savedUser.setPatient(savedPatient);

        // GỬI TIN NHẮN ĐỒNG BỘ
        sendUserSyncMessage(savedUser, userRole.getRoleName());

        return savedUser;
    }

    // ------------------------------------------------------------------------
    // 2. API ADMIN: TẠO BÁC SĨ (CREATE DOCTOR)
    // ------------------------------------------------------------------------
    @Transactional
    public User createDoctor(DoctorRequest request) {

        // Kiểm tra Email/SĐT
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Lỗi: Email đã được sử dụng!");
        }
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Lỗi: Số điện thoại đã được sử dụng!");
        }

        // Tìm ROLE_DOCTOR
        Role userRole = roleRepository.findByRoleName("ROLE_DOCTOR")
                .orElseThrow(() -> new RuntimeException("Lỗi: Role 'ROLE_DOCTOR' chưa được tạo trong database!"));

        // Tạo User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Mã hóa Pass
        user.setRole(userRole);
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);

        // Tạo Doctor (sử dụng @MapsId)
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser); // Liên kết (quan trọng!)
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setWorkSchedule(request.getWorkSchedule());
        Doctor savedDoctor = doctorRepository.save(doctor);

        // Thiết lập liên kết ngược
        savedUser.setDoctor(savedDoctor);

        // GỬI TIN NHẮN ĐỒNG BỘ
        sendUserSyncMessage(savedUser, userRole.getRoleName());

        return savedUser;
    }

    // ------------------------------------------------------------------------
    // 3. API ADMIN: ĐỒNG BỘ THỦ CÔNG (SYNC)
    // ------------------------------------------------------------------------
    // Hàm này dùng để đồng bộ các user tạo thủ công (như Admin)
    //@Transactional(readOnly = true)
    public void forceSyncUser(Long userId) {

        // Tìm user theo ID (sẽ tự động load cả Role)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Lỗi: User không tồn tại (ID: " + userId + ")"));

        // GỌI HÀM GỬI TIN NHẮN ĐỒNG BỘ
        // SỬA LỖI: Chỉ truyền 2 tham số (User và RoleName)
        sendUserSyncMessage(user, user.getRole().getRoleName());
    }

    // ------------------------------------------------------------------------
    // HÀM HỖ TRỢ (PRIVATE)
    // ------------------------------------------------------------------------
    private void sendUserSyncMessage(User user, String roleName) {
        UserSyncDto syncDto = new UserSyncDto();
        syncDto.setId(user.getId());
        syncDto.setEmail(user.getEmail());
        syncDto.setPhoneNumber(user.getPhoneNumber());
        syncDto.setPassword(user.getPassword()); // Gửi pass đã mã hóa
        syncDto.setRoleName(roleName);

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.ROUTING_KEY,
                syncDto
        );
        System.out.println("UserService: Đã gửi tin nhắn đồng bộ user: " + user.getEmail());
    }

    // ------------------------------------------------------------------------
    // 4. API LẤY THÔNG TIN USER HIỆN TẠI (GET CURRENT USER)
    // ------------------------------------------------------------------------
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user với email: " + email));
    }

    // ------------------------------------------------------------------------
    // 5. API LẤY DANH SÁCH BÁC SĨ (GET ALL DOCTORS)
    // ------------------------------------------------------------------------
    public java.util.List<com.datt.userservice.dto.DoctorDTO> findAllDoctors() {
        // Tìm role DOCTOR, nếu không có thì trả về list rỗng
        java.util.Optional<Role> doctorRoleOpt = roleRepository.findByRoleName("ROLE_DOCTOR");
        if (!doctorRoleOpt.isPresent()) {
            return new java.util.ArrayList<>();
        }
        
        Role doctorRole = doctorRoleOpt.get();
        
        // Lấy tất cả users có role DOCTOR và map sang DTO
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() != null && user.getRole().equals(doctorRole))
                .map(user -> {
                    com.datt.userservice.dto.DoctorDTO dto = new com.datt.userservice.dto.DoctorDTO();
                    dto.setId(user.getId());
                    dto.setFullName(user.getFullName());
                    dto.setEmail(user.getEmail());
                    
                    // Lấy thông tin từ Doctor entity
                    if (user.getDoctor() != null) {
                        dto.setSpecialization(user.getDoctor().getSpecialization());
                        dto.setExperienceYears(user.getDoctor().getExperienceYears());
                        dto.setWorkSchedule(user.getDoctor().getWorkSchedule());
                        dto.setConsultationFee(user.getDoctor().getConsultationFee());
                    }
                    
                    return dto;
                })
                .collect(java.util.stream.Collectors.toList());
    }
}