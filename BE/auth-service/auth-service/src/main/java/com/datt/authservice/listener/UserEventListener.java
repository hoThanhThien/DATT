package com.datt.authservice.listener;

import com.datt.authservice.config.RabbitMQConfig;
import com.datt.authservice.dto.UserSyncDto;
import com.datt.authservice.model.Role;
import com.datt.authservice.model.User;
import com.datt.authservice.repository.RoleRepository;
import com.datt.authservice.repository.UserRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class UserEventListener {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)

    public void handleUserCreated(UserSyncDto syncDto) {
        System.out.println("AuthService: Đã nhận được tin nhắn đồng bộ user: " + syncDto.getEmail());


        Role userRole = roleRepository.findByRoleName(syncDto.getRoleName())
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setRoleName(syncDto.getRoleName());
                    return roleRepository.save(newRole);
                });


        User user = new User();
        user.setId(syncDto.getId());
        user.setEmail(syncDto.getEmail());
        user.setPhoneNumber(syncDto.getPhoneNumber());
        user.setPassword(syncDto.getPassword());
        user.setRole(userRole);
        user.setStatus("ACTIVE");

        userRepository.save(user);
        System.out.println("AuthService: Đã lưu bản sao user vào auth_db.");
    }
}