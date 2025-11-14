package com.datt.authservice.dto;

import lombok.Data;
import java.io.Serializable;

@Data
public class UserSyncDto implements Serializable {
    private Long id;
    private String email;
    private String phoneNumber;
    private String password;
    private String roleName;
}