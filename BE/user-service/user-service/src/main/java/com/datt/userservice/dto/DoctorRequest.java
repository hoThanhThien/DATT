package com.datt.userservice.dto;

import lombok.Data;

@Data
public class DoctorRequest {


    private String email;
    private String phoneNumber;
    private String password;
    private String fullName;
    private String gender;



    private String specialization;
    private int experienceYears;
    private String workSchedule;
}