package adn_web.java_project.controller;

import adn_web.java_project.model.TestResult;
import adn_web.java_project.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/test-results")
@CrossOrigin(origins = "http://localhost:3000")
public class TestResultController {

    private final TestResultService testResultService;

    @Autowired
    public TestResultController(TestResultService testResultService) {
        this.testResultService = testResultService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createTestResult(@RequestBody TestResult testResult) {
        TestResult createdTestResult = testResultService.save(testResult);
        return ResponseEntity.status(201).body(createdTestResult);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateTestResult(@PathVariable Long id, @RequestBody TestResult testResult) {
        return testResultService.findById(id)
                .map(existingResult -> {
                    testResult.setId(id);
                    TestResult updatedResult = testResultService.save(testResult);
                    return ResponseEntity.ok(updatedResult);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTestResult(@PathVariable Long id) {
        if (testResultService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        testResultService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TestResult>> getAllTestResults() {
        return ResponseEntity.ok(testResultService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTestResultById(@PathVariable Long id) {
        return testResultService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/test/{testId}")
    public ResponseEntity<?> getTestResultByTestId(@PathVariable Long testId) {
        return testResultService.findByTestId(testId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/my-results")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<TestResult>> getMyResults() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return ResponseEntity.ok(testResultService.getMyResults(username));
    }

    @GetMapping("/performed-by/{performedById}")
    public ResponseEntity<List<TestResult>> getTestResultsByPerformedById(@PathVariable Long performedById) {
        return ResponseEntity.ok(testResultService.getTestResultsByPerformedById(performedById));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<TestResult>> getTestResultsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(testResultService.getTestResultsByDateRange(startDate, endDate));
    }

    @GetMapping("/check-test/{testId}")
    public ResponseEntity<Boolean> existsByTestId(@PathVariable Long testId) {
        return ResponseEntity.ok(testResultService.findByTestId(testId).isPresent());
    }
} 