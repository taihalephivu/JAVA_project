package adn_web.java_project.service;

import adn_web.java_project.model.TestResult;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TestResultService {
    TestResult createTestResult(TestResult testResult);
    TestResult updateTestResult(Long id, TestResult testResult);
    void deleteTestResult(Long id);
    Optional<TestResult> getTestResultById(Long id);
    Optional<TestResult> getTestResultByTestId(Long testId);
    List<TestResult> getTestResultsByPerformedById(Long performedById);
    List<TestResult> getTestResultsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    boolean existsByTestId(Long testId);
} 