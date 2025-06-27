package adn_web.java_project.service.impl;

import adn_web.java_project.model.Appointment;
import adn_web.java_project.model.AppointmentStatus;
import adn_web.java_project.model.Test;
import adn_web.java_project.model.TestPackage;
import adn_web.java_project.model.TestStatus;
import adn_web.java_project.model.PaymentStatus;
import adn_web.java_project.repository.AppointmentRepository;
import adn_web.java_project.repository.TestPackageRepository;
import adn_web.java_project.repository.TestRepository;
import adn_web.java_project.service.AppointmentService;
import adn_web.java_project.service.NotificationService;
import adn_web.java_project.model.User;
import adn_web.java_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final TestRepository testRepository;
    private final TestPackageRepository testPackageRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, TestRepository testRepository, TestPackageRepository testPackageRepository, NotificationService notificationService, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.testRepository = testRepository;
        this.testPackageRepository = testPackageRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        if (appointment.getAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Appointment date must be in the future");
        }
        Appointment saved = appointmentRepository.save(appointment);
        // Gửi thông báo cho tất cả admin
        List<User> admins = userRepository.findAll().stream().filter(u -> u.getRole().name().equals("ROLE_ADMIN")).toList();
        for (User admin : admins) {
            notificationService.createNotification(
                admin,
                String.format("Người dùng %s vừa tạo lịch hẹn mới.",
                    appointment.getUser().getFullName(),
                    appointment.getTestTypeName(),
                    appointment.getAppointmentDate().toString()
                ),
                "/admin/appointments"
            );
        }
        return saved;
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        // Validate appointment date is in the future
        if (appointment.getAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Appointment date must be in the future");
        }

        existingAppointment.setUser(appointment.getUser());
        existingAppointment.setTestTypeName(appointment.getTestTypeName());
        existingAppointment.setAppointmentDate(appointment.getAppointmentDate());
        existingAppointment.setStatus(appointment.getStatus());
        existingAppointment.setNotes(appointment.getNotes());

        return appointmentRepository.save(existingAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByUserId(Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByUserIdAndStatus(Long userId, AppointmentStatus status) {
        return appointmentRepository.findByUserIdAndStatus(userId, status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return appointmentRepository.findByAppointmentDateBetween(startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Appointment> getAppointmentsByUserId(Long userId, Pageable pageable) {
        return appointmentRepository.findByUserId(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByDateRangeAndStatus(
            LocalDateTime startDate, 
            LocalDateTime endDate, 
            AppointmentStatus status) {
        return appointmentRepository.findByAppointmentDateBetweenAndStatus(startDate, endDate, status);
    }

    @Override
    public Appointment updateAppointmentStatus(Long id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        appointment.setStatus(status);
        if (status == AppointmentStatus.CONFIRMED) {
            TestPackage testPackage = testPackageRepository.findByName(appointment.getTestTypeName())
                    .orElseThrow(() -> new RuntimeException("Test package not found: " + appointment.getTestTypeName()));
            Test test = new Test();
            test.setUser(appointment.getUser());
            test.setTestTypeName(appointment.getTestTypeName());
            String sampleCode;
            do {
                sampleCode = java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            } while (testRepository.existsBySampleCode(sampleCode));
            test.setSampleCode(sampleCode);
            test.setStatus(TestStatus.PENDING);
            test.setPaymentStatus(PaymentStatus.PENDING);
            test.setTotalAmount(testPackage.getPrice());
            testRepository.save(test);
            // Gửi thông báo cho user
            notificationService.createNotification(
                appointment.getUser(),
                String.format("Lịch hẹn %s của bạn đã đượcxác nhận.",
                    appointment.getTestTypeName(),
                    appointment.getAppointmentDate().toString()
                ),
                "/appointments"
            );
        }
        return appointmentRepository.save(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Appointment> getAppointmentsByUsername(String username, Pageable pageable) {
        return appointmentRepository.findByUser_Username(username, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Appointment> findAll(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }
} 