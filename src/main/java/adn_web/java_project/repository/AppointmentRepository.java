package adn_web.java_project.repository;

import adn_web.java_project.model.Appointment;
import adn_web.java_project.model.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUserId(Long userId);
    List<Appointment> findByTestTypeId(Long testTypeId);
    List<Appointment> findByStatus(AppointmentStatus status);
    List<Appointment> findByUserIdAndStatus(Long userId, AppointmentStatus status);
    List<Appointment> findByAppointmentDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    Page<Appointment> findByUserId(Long userId, Pageable pageable);
    List<Appointment> findByAppointmentDateBetweenAndStatus(
        LocalDateTime startDate, 
        LocalDateTime endDate, 
        AppointmentStatus status
    );
} 