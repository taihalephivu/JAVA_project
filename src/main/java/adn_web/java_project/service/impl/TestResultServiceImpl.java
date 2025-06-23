package adn_web.java_project.service.impl;

import adn_web.java_project.model.TestResult;
import adn_web.java_project.repository.TestResultRepository;
import adn_web.java_project.service.TestResultService;
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

    @Autowired
    public TestResultServiceImpl(TestResultRepository testResultRepository) {
        this.testResultRepository = testResultRepository;
    }

    @Override
    public TestResult createTestResult(TestResult testResult) {
        if (testResultRepository.existsByTestId(testResult.getTest().getId())) {
            throw new RuntimeException("Test result already exists for test with id: " + testResult.getTest().getId());
        }
        return testResultRepository.save(testResult);
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

        return testResultRepository.save(existingTestResult);
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
} 