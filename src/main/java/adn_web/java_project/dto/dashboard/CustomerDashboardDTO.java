package adn_web.java_project.dto.dashboard;

import adn_web.java_project.model.Appointment;
import adn_web.java_project.model.Test;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDashboardDTO {
    // Statistics
    private long totalTests;
    private long pendingTests;
    private long completedTests;
    private long totalAppointments;
    private long todayAppointments;
    private BigDecimal totalSpent;

    // Recent activities
    private List<Test> recentTests;
    private List<Appointment> upcomingAppointments;
} 