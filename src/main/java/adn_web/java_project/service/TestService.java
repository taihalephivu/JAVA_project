package adn_web.java_project.service;

import adn_web.java_project.model.Test;
import adn_web.java_project.model.TestStatus;
import adn_web.java_project.model.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TestService {
    Test createTest(Test test);
    Test updateTest(Long id, Test test);
    void deleteTest(Long id);
    Optional<Test> getTestById(Long id);
    Optional<Test> getTestBySampleCode(String sampleCode);
    List<Test> getTestsByUserId(Long userId);
    List<Test> getTestsByStatus(TestStatus status);
    List<Test> getTestsByPaymentStatus(PaymentStatus paymentStatus);
    List<Test> getTestsByUserIdAndStatus(Long userId, TestStatus status);
    List<Test> getTestsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    Page<Test> getTestsByUserId(Long userId, Pageable pageable);
    List<Test> getTestsByUserIdAndPaymentStatus(Long userId, PaymentStatus status);
    boolean existsBySampleCode(String sampleCode);
    Test updateTestStatus(Long id, TestStatus status);
    Test updatePaymentStatus(Long id, PaymentStatus status);
    Page<Test> getTestsByUsername(String username, Pageable pageable);
    Page<Test> findAll(Pageable pageable);
} 