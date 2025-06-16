package adn_web.java_project.controller;

import adn_web.java_project.model.TestResult;
import adn_web.java_project.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<?> createTestResult(@RequestBody TestResult testResult) {
        try {
            TestResult createdTestResult = testResultService.createTestResult(testResult);
            return ResponseEntity.ok(createdTestResult);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<?> updateTestResult(@PathVariable Long id, @RequestBody TestResult testResult) {
        try {
            TestResult updatedTestResult = testResultService.updateTestResult(id, testResult);
            return ResponseEntity.ok(updatedTestResult);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTestResult(@PathVariable Long id) {
        try {
            testResultService.deleteTestResult(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Test result deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTestResultById(@PathVariable Long id) {
        return testResultService.getTestResultById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/test/{testId}")
    public ResponseEntity<?> getTestResultByTestId(@PathVariable Long testId) {
        return testResultService.getTestResultByTestId(testId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
        return ResponseEntity.ok(testResultService.existsByTestId(testId));
    }
} 