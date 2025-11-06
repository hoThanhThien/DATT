package com.datt.userservice.service;

import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.model.Patient;
import com.datt.userservice.model.Role;
import com.datt.userservice.model.User;
import com.datt.userservice.repository.PatientRepository;
import com.datt.userservice.repository.RoleRepository;
import com.datt.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PatientRepository patientRepository;
    // (Xóa DoctorRepository vì không dùng ở đây nữa)
    @Autowired private PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(RegisterRequest request) { // Dùng DTO đã sửa

        // 1. Kiểm tra Email/SĐT
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Lỗi: Email đã được sử dụng!");
        }
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Lỗi: Số điện thoại đã được sử dụng!");
        }

        // 2. TÌM VAI TRÒ "ROLE_PATIENT" (ĐÃ ĐƯỢC HARDCODE)
        Role userRole = roleRepository.findByRoleName("ROLE_PATIENT")
                .orElseThrow(() -> new RuntimeException("Lỗi: Role 'ROLE_PATIENT' chưa được tạo trong database!"));

        // 3. Tạo User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Mã hóa Pass
        user.setRole(userRole); // Gán vai trò Bệnh nhân
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);


        Patient patient = new Patient();
        patient.setUser(savedUser);
        patient.setDob(request.getDob());
        patient.setInsuranceNumber(request.getInsuranceNumber());

        patientRepository.save(patient);

        return savedUser;
    }

    // (Sau này bạn sẽ tạo một hàm mới cho Admin, ví dụ: createDoctor(DoctorRequest request) ...)
}