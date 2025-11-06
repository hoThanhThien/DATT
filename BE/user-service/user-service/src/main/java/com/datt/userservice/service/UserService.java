package com.datt.userservice.service;

import com.datt.userservice.config.RabbitMQConfig; // <-- 1. THÊM IMPORT
import com.datt.userservice.dto.DoctorRequest;
import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.dto.UserSyncDto; // <-- 1. THÊM IMPORT
import com.datt.userservice.model.Doctor;
import com.datt.userservice.model.Patient;
import com.datt.userservice.model.Role;
import com.datt.userservice.model.User;
import com.datt.userservice.repository.DoctorRepository;
import com.datt.userservice.repository.PatientRepository;
import com.datt.userservice.repository.RoleRepository;
import com.datt.userservice.repository.UserRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate; // <-- 1. THÊM IMPORT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Autowired private RabbitTemplate rabbitTemplate; // <-- 2. THÊM AUTOWIRED NÀY

    @Transactional
    public User registerUser(RegisterRequest request) {

        // ... (Code kiểm tra Email/SĐT của bạn) ...

        Role userRole = roleRepository.findByRoleName("ROLE_PATIENT")
                .orElseThrow(() -> new RuntimeException("Lỗi: Role 'ROLE_PATIENT' chưa được tạo trong database!"));

        // ... (Code tạo User và mã hóa pass của bạn) ...
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(userRole);
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);

        // ... (Code tạo Patient của bạn) ...
        Patient patient = new Patient();
        patient.setUser(savedUser);
        patient.setDob(request.getDob());
        patient.setInsuranceNumber(request.getInsuranceNumber());
        Patient savedPatient = patientRepository.save(patient);

        savedUser.setPatient(savedPatient);

        // ----- 3. THÊM LOGIC GỬI TIN NHẮN -----
        sendUserSyncMessage(savedUser, userRole.getRoleName());
        // ------------------------------------

        return savedUser;
    }

    @Transactional
    public User createDoctor(DoctorRequest request) {

        // ... (Code kiểm tra Email/SĐT của bạn) ...

        Role userRole = roleRepository.findByRoleName("ROLE_DOCTOR")
                .orElseThrow(() -> new RuntimeException("Lỗi: Role 'ROLE_DOCTOR' chưa được tạo trong database!"));

        // ... (Code tạo User và mã hóa pass của bạn) ...
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(userRole);
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);

        // ... (Code tạo Doctor của bạn) ...
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser);
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setWorkSchedule(request.getWorkSchedule());
        Doctor savedDoctor = doctorRepository.save(doctor);

        savedUser.setDoctor(savedDoctor);

        // ----- 3. THÊM LOGIC GỬI TIN NHẮN -----
        sendUserSyncMessage(savedUser, userRole.getRoleName());
        // ------------------------------------

        return savedUser;
    }

    // ----- HÀM HỖ TRỢ GỬI TIN NHẮN (ĐÃ THÊM) -----
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
}