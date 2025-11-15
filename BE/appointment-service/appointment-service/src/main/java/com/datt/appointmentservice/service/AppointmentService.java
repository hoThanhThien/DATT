package com.datt.appointmentservice.service;

import com.datt.appointmentservice.model.Appointment;
import com.datt.appointmentservice.model.AppointmentType; // 1. Thêm import
import com.datt.appointmentservice.model.Status;
import com.datt.appointmentservice.repository.AppointmentRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate; // 2. Thêm import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // 3. Thêm import

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {


    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    // Định nghĩa Exchange và Routing Key
    public static final String EXCHANGE_NAME = "appointment_exchange";
    public static final String ROUTING_KEY_SCHEDULED = "appointment.scheduled";

    @Transactional
    public Appointment createAppointment(Appointment appointment) {

        appointment.setCreated(LocalDateTime.now());

        if (appointment.getType() == AppointmentType.OFFLINE) {
            // ----- LOGIC OFFLINE (TRỰC TIẾP) -----
            appointment.setStatus(Status.SCHEDULED); // 1. Gán trạng thái đã lên lịch
            String queueNum = "A-" + System.currentTimeMillis() % 10000;
            appointment.setQueueNumber(queueNum); // 2. Tạo mã số thứ tự


            Appointment savedAppointment = appointmentRepository.save(appointment);

            System.out.println("AppointmentService: Gửi tin nhắn lịch hẹn OFFLINE đã được tạo: " + savedAppointment.getId());
            rabbitTemplate.convertAndSend(
                    EXCHANGE_NAME,
                    ROUTING_KEY_SCHEDULED,
                    savedAppointment.getId()
            );

            return savedAppointment;

        } else {
            // ----- LOGIC ONLINE (TRỰC TUYẾN) -----
            appointment.setStatus(Status.PENDING); // Chờ thanh toán
            // (Không gửi tin nhắn, vì chờ payment-service xác nhận)
            return appointmentRepository.save(appointment);
        }
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Transactional
    public Appointment updateStatus(Long id, Status status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);
        appointment.setUpdated(LocalDateTime.now());

        Appointment updatedAppointment = appointmentRepository.save(appointment);



        return updatedAppointment;
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}