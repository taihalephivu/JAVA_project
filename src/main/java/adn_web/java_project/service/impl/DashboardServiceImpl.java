package adn_web.java_project.service.impl;

import adn_web.java_project.dto.dashboard.CustomerDashboardDTO;
import adn_web.java_project.model.Appointment;
import adn_web.java_project.model.Test;
import adn_web.java_project.model.TestStatus;
import adn_web.java_project.repository.AppointmentRepository;
import adn_web.java_project.repository.TestRepository;
import adn_web.java_project.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final TestRepository testRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public CustomerDashboardDTO getCustomerDashboard(Long userId) {
        // Test statistics
        long totalTests = testRepository.countByUserId(userId);
        long pendingTests = testRepository.countByUserIdAndStatus(userId, TestStatus.PENDING);
        long completedTests = testRepository.countByUserIdAndStatus(userId, TestStatus.COMPLETED);
        BigDecimal totalSpent = testRepository.calculateTotalSpentByUserId(userId);
        List<Test> recentTests = testRepository.findTop5ByUserIdOrderByCreatedAtDesc(userId);

        // Appointment statistics
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        long totalAppointments = appointmentRepository.countByUserId(userId);
        long todayAppointments = appointmentRepository.countByUserIdAndAppointmentDateBetween(userId, startOfDay, endOfDay);
        List<Appointment> upcomingAppointments = appointmentRepository.findTop5ByUserIdAndAppointmentDateAfterOrderByAppointmentDateAsc(userId, LocalDateTime.now());

        return new CustomerDashboardDTO(
                totalTests,
                pendingTests,
                completedTests,
                totalAppointments,
                todayAppointments,
                totalSpent,
                recentTests,
                upcomingAppointments
        );
    }
} 