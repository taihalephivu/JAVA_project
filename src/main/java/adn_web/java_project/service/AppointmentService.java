package adn_web.java_project.service;

import adn_web.java_project.model.Appointment;
import adn_web.java_project.model.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    Appointment createAppointment(Appointment appointment);
    Appointment updateAppointment(Long id, Appointment appointment);
    void deleteAppointment(Long id);
    Optional<Appointment> getAppointmentById(Long id);
    List<Appointment> getAppointmentsByUserId(Long userId);
    Page<Appointment> getAppointmentsByUsername(String username, Pageable pageable);
    List<Appointment> getAppointmentsByTestTypeId(Long testTypeId);
    List<Appointment> getAppointmentsByStatus(AppointmentStatus status);
    List<Appointment> getAppointmentsByUserIdAndStatus(Long userId, AppointmentStatus status);
    List<Appointment> getAppointmentsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    Page<Appointment> getAppointmentsByUserId(Long userId, Pageable pageable);
    List<Appointment> getAppointmentsByDateRangeAndStatus(
        LocalDateTime startDate, 
        LocalDateTime endDate, 
        AppointmentStatus status
    );
    Appointment updateAppointmentStatus(Long id, AppointmentStatus status);
} 