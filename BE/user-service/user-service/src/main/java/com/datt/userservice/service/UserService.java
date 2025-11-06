package com.datt.userservice.service;

import com.datt.userservice.dto.DoctorRequest;
import com.datt.userservice.dto.RegisterRequest;
import com.datt.userservice.model.Doctor;
import com.datt.userservice.model.Patient;
import com.datt.userservice.model.Role;
import com.datt.userservice.model.User;
import com.datt.userservice.repository.DoctorRepository;
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
    @Autowired private DoctorRepository doctorRepository;
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


        Patient savedPatient = patientRepository.save(patient);
        savedUser.setPatient(savedPatient);


        return savedUser;
    }
    @Transactional
    public User createDoctor(DoctorRequest request) {

        // 1. Kiểm tra Email/SĐT
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Lỗi: Email đã được sử dụng!");
        }
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Lỗi: Số điện thoại đã được sử dụng!");
        }

        // 2. TÌM VAI TRÒ "ROLE_DOCTOR" (ĐÃ ĐƯỢC HARDCODE)
        Role userRole = roleRepository.findByRoleName("ROLE_DOCTOR")
                .orElseThrow(() -> new RuntimeException("Lỗi: Role 'ROLE_DOCTOR' chưa được tạo trong database!"));

        // 3. Tạo User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Mã hóa Pass
        user.setRole(userRole); // Gán vai trò Bác sĩ
        user.setStatus("ACTIVE");

        User savedUser = userRepository.save(user);

        // 4. CHỈ TẠO BÁC SĨ (DOCTOR)
        Doctor doctor = new Doctor();
        doctor.setUser(savedUser); // Liên kết (quan trọng!)
        doctor.setSpecialization(request.getSpecialization());
        doctor.setExperienceYears(request.getExperienceYears());
        doctor.setWorkSchedule(request.getWorkSchedule());

        Doctor savedDoctor = doctorRepository.save(doctor);

        // 5. Set liên kết ngược (để response JSON đẹp)
        savedUser.setDoctor(savedDoctor);

        return savedUser;
    }
    // (Sau này bạn sẽ tạo một hàm mới cho Admin, ví dụ: createDoctor(DoctorRequest request) ...)
}