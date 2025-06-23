package adn_web.java_project.controller;

import adn_web.java_project.dto.appointment.AppointmentRequestDTO;
import adn_web.java_project.model.Appointment;
import adn_web.java_project.model.AppointmentStatus;
import adn_web.java_project.model.User;
import adn_web.java_project.service.AppointmentService;
import adn_web.java_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final UserService userService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentRequestDTO request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUsername = authentication.getName();
            User currentUser = userService.findByUsername(currentUsername);

            Appointment appointment = new Appointment();
            appointment.setUser(currentUser);
            appointment.setTestTypeName(request.getTestTypeName());
            appointment.setAppointmentDate(request.getAppointmentDate());
            appointment.setNotes(request.getNotes());

            Appointment createdAppointment = appointmentService.createAppointment(appointment);
            return ResponseEntity.ok(createdAppointment);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointment(id, appointment);
            return ResponseEntity.ok(updatedAppointment);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Appointment deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Appointment>> getAppointmentsByUserId(
            @PathVariable Long userId,
            Pageable pageable) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByUserId(userId, pageable));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByStatus(@PathVariable AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByStatus(status));
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserIdAndStatus(
            @PathVariable Long userId,
            @PathVariable AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByUserIdAndStatus(userId, status));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Appointment>> getAppointmentsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDateRange(startDate, endDate));
    }

    @GetMapping("/date-range/status")
    public ResponseEntity<List<Appointment>> getAppointmentsByDateRangeAndStatus(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDateRangeAndStatus(startDate, endDate, status));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, status);
            return ResponseEntity.ok(updatedAppointment);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/my-appointments")
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    public ResponseEntity<Page<Appointment>> getMyAppointments(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        return ResponseEntity.ok(appointmentService.getAppointmentsByUsername(currentUsername, pageable));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Appointment>> getAllAppointments(Pageable pageable) {
        Page<Appointment> appointments = appointmentService.findAll(pageable);
        return ResponseEntity.ok(appointments);
    }
} 