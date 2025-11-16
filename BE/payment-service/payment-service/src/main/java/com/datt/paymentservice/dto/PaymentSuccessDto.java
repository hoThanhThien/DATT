package com.datt.paymentservice.dto; // (Bạn sẽ đổi tên package này)

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSuccessDto implements Serializable {
    private Long paymentId;
    private Long appointmentId;
    private Long patientId;
    private Long doctorId;
    private BigDecimal amount;
    private LocalDateTime appointmentTime;
    private String appointmentType; // "ONLINE"
}