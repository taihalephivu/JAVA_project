package adn_web.java_project.service.impl;

import adn_web.java_project.model.Test;
import adn_web.java_project.model.TestStatus;
import adn_web.java_project.model.PaymentStatus;
import adn_web.java_project.repository.TestRepository;
import adn_web.java_project.service.TestService;
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
public class TestServiceImpl implements TestService {

    private final TestRepository testRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    @Autowired
    public TestServiceImpl(TestRepository testRepository, NotificationService notificationService, UserRepository userRepository) {
        this.testRepository = testRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @Override
    public Test createTest(Test test) {
        if (testRepository.existsBySampleCode(test.getSampleCode())) {
            throw new RuntimeException("Test with sample code " + test.getSampleCode() + " already exists");
        }
        return testRepository.save(test);
    }

    @Override
    public Test updateTest(Long id, Test test) {
        Test existingTest = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + id));

        // Check if the new sample code is already taken by another test
        if (!existingTest.getSampleCode().equals(test.getSampleCode()) && 
            testRepository.existsBySampleCode(test.getSampleCode())) {
            throw new RuntimeException("Test with sample code " + test.getSampleCode() + " already exists");
        }

        existingTest.setTestTypeName(test.getTestTypeName());
        existingTest.setUser(test.getUser());
        existingTest.setSampleCode(test.getSampleCode());
        existingTest.setSampleCollectionDate(test.getSampleCollectionDate());
        existingTest.setExpectedCompletionDate(test.getExpectedCompletionDate());
        existingTest.setActualCompletionDate(test.getActualCompletionDate());
        existingTest.setStatus(test.getStatus());
        existingTest.setTotalAmount(test.getTotalAmount());
        PaymentStatus oldStatus = existingTest.getPaymentStatus();
        existingTest.setPaymentStatus(test.getPaymentStatus());

        Test saved = testRepository.save(existingTest);
        // Nếu vừa chuyển sang PAID thì gửi thông báo cho admin
        if (oldStatus != PaymentStatus.PAID && test.getPaymentStatus() == PaymentStatus.PAID) {
            List<User> admins = userRepository.findAll().stream().filter(u -> u.getRole().name().equals("ROLE_ADMIN")).toList();
            for (User admin : admins) {
                notificationService.createNotification(
                    admin,
                    String.format("Người dùng %s vừa thanh toán thành công.",
                        existingTest.getUser().getFullName(),
                        existingTest.getSampleCode(),
                        existingTest.getTestTypeName()
                    ),
                    "/admin/tests/" + existingTest.getId()
                );
            }
        }
        return saved;
    }

    @Override
    public void deleteTest(Long id) {
        if (!testRepository.existsById(id)) {
            throw new RuntimeException("Test not found with id: " + id);
        }
        testRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Test> getTestById(Long id) {
        return testRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Test> getTestBySampleCode(String sampleCode) {
        return testRepository.findBySampleCode(sampleCode);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Test> getTestsByUserId(Long userId) {
        return testRepository.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Test> getTestsByStatus(TestStatus status) {
        return testRepository.findByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Test> getTestsByPaymentStatus(PaymentStatus paymentStatus) {
        return testRepository.findByPaymentStatus(paymentStatus);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Test> getTestsByUserIdAndStatus(Long userId, TestStatus status) {
        return testRepository.findByUserIdAndStatus(userId, status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Test> getTestsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return testRepository.findBySampleCollectionDateBetween(startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Test> getTestsByUserId(Long userId, Pageable pageable) {
        return testRepository.findByUserId(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsBySampleCode(String sampleCode) {
        return testRepository.existsBySampleCode(sampleCode);
    }

    @Override
    public Test updateTestStatus(Long id, TestStatus status) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + id));
        test.setStatus(status);
        return testRepository.save(test);
    }

    @Override
    public Test updatePaymentStatus(Long id, PaymentStatus status) {
        Test test = testRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + id));
        test.setPaymentStatus(status);
        return testRepository.save(test);
    }

    @Override
    public List<Test> getTestsByUserIdAndPaymentStatus(Long userId, PaymentStatus status) {
        return testRepository.findByUserIdAndPaymentStatus(userId, status);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Test> getTestsByUsername(String username, Pageable pageable) {
        return testRepository.findByUser_Username(username, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Test> findAll(Pageable pageable) {
        return testRepository.findAll(pageable);
    }
} 