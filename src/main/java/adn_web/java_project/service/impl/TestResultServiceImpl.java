package adn_web.java_project.service.impl;

import adn_web.java_project.model.Test;
import adn_web.java_project.model.TestResult;
import adn_web.java_project.model.TestStatus;
import adn_web.java_project.repository.TestRepository;
import adn_web.java_project.repository.TestResultRepository;
import adn_web.java_project.service.TestResultService;
import adn_web.java_project.service.NotificationService;
import adn_web.java_project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TestResultServiceImpl implements TestResultService {

    private final TestResultRepository testResultRepository;
    private final TestRepository testRepository;
    private final NotificationService notificationService;

    @Autowired
    public TestResultServiceImpl(TestResultRepository testResultRepository, TestRepository testRepository, NotificationService notificationService) {
        this.testResultRepository = testResultRepository;
        this.testRepository = testRepository;
        this.notificationService = notificationService;
    }

    @Override
    public TestResult createTestResult(TestResult testResult) {
        testResult.setPerformedAt(LocalDateTime.now());
        TestResult savedResult = testResultRepository.save(testResult);

        Test test = testRepository.findById(savedResult.getTest().getId())
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + savedResult.getTest().getId()));

        test.setStatus(TestStatus.COMPLETED);
        test.setActualCompletionDate(LocalDateTime.now());
        testRepository.save(test);

        // Gửi thông báo cho user
        User user = test.getUser();
        notificationService.createNotification(
            user,
            String.format("Kết quả xét nghiệm %s (%s) của bạn đã có. Vui lòng kiểm tra kết quả.",
                test.getSampleCode(),
                test.getTestTypeName()
            ),
            "/tests/" + test.getId()
        );

        return savedResult;
    }

    @Override
    public TestResult updateTestResult(Long id, TestResult testResult) {
        TestResult existingTestResult = testResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test result not found with id: " + id));

        existingTestResult.setResultData(testResult.getResultData());
        existingTestResult.setInterpretation(testResult.getInterpretation());
        existingTestResult.setRecommendations(testResult.getRecommendations());
        existingTestResult.setPerformedBy(testResult.getPerformedBy());
        existingTestResult.setPerformedAt(testResult.getPerformedAt());

        TestResult updated = testResultRepository.save(existingTestResult);

        // Gửi thông báo cho user
        Test test = existingTestResult.getTest();
        User user = test.getUser();
        notificationService.createNotification(
            user,
            String.format("Kết quả xét nghiệm %s (%s) của bạn đã được cập nhật. Vui lòng kiểm tra lại kết quả.",
                test.getSampleCode(),
                test.getTestTypeName()
            ),
            "/tests/" + test.getId()
        );

        return updated;
    }

    @Override
    public void deleteTestResult(Long id) {
        if (!testResultRepository.existsById(id)) {
            throw new RuntimeException("Test result not found with id: " + id);
        }
        testResultRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TestResult> getTestResultById(Long id) {
        return testResultRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TestResult> getTestResultByTestId(Long testId) {
        return testResultRepository.findByTestId(testId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestResult> getTestResultsByPerformedById(Long performedById) {
        return testResultRepository.findByPerformedById(performedById);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestResult> getTestResultsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return testResultRepository.findByPerformedAtBetween(startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByTestId(Long testId) {
        return testResultRepository.existsByTestId(testId);
    }

    @Override
    public TestResult save(TestResult testResult) {
        return testResultRepository.save(testResult);
    }

    @Override
    public Optional<TestResult> findById(Long id) {
        return testResultRepository.findById(id);
    }

    @Override
    public List<TestResult> findAll() {
        return testResultRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        testResultRepository.deleteById(id);
    }

    @Override
    public List<TestResult> getMyResults(String username) {
        return testResultRepository.findByTest_User_Username(username);
    }

    @Override
    public Optional<TestResult> findByTestId(Long testId) {
        return testResultRepository.findByTestId(testId);
    }
} 