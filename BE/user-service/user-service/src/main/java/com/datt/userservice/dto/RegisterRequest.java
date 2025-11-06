package com.datt.userservice.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RegisterRequest {

    private String email;
    private String phoneNumber;
    private String password;
    private String fullName;
    private String gender;


    private LocalDate dob;
    private String insuranceNumber;

}