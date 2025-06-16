package adn_web.java_project.controller;

import adn_web.java_project.model.Test;
import adn_web.java_project.model.TestStatus;
import adn_web.java_project.model.PaymentStatus;
import adn_web.java_project.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    private final TestService testService;

    @Autowired
    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<?> createTest(@RequestBody Test test) {
        try {
            Test createdTest = testService.createTest(test);
            return ResponseEntity.ok(createdTest);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<?> updateTest(@PathVariable Long id, @RequestBody Test test) {
        try {
            Test updatedTest = testService.updateTest(id, test);
            return ResponseEntity.ok(updatedTest);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTest(@PathVariable Long id) {
        try {
            testService.deleteTest(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Test deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTestById(@PathVariable Long id) {
        return testService.getTestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sample/{sampleCode}")
    public ResponseEntity<?> getTestBySampleCode(@PathVariable String sampleCode) {
        return testService.getTestBySampleCode(sampleCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Test>> getTestsByUserId(@PathVariable Long userId, Pageable pageable) {
        return ResponseEntity.ok(testService.getTestsByUserId(userId, pageable));
    }

    @GetMapping("/type/{testTypeId}")
    public ResponseEntity<List<Test>> getTestsByTestTypeId(@PathVariable Long testTypeId) {
        return ResponseEntity.ok(testService.getTestsByTestTypeId(testTypeId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Test>> getTestsByStatus(@PathVariable TestStatus status) {
        return ResponseEntity.ok(testService.getTestsByStatus(status));
    }

    @GetMapping("/payment-status/{status}")
    public ResponseEntity<List<Test>> getTestsByPaymentStatus(@PathVariable PaymentStatus status) {
        return ResponseEntity.ok(testService.getTestsByPaymentStatus(status));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Test>> getTestsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(testService.getTestsByDateRange(startDate, endDate));
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Test>> getTestsByUserIdAndStatus(
            @PathVariable Long userId,
            @PathVariable TestStatus status) {
        return ResponseEntity.ok(testService.getTestsByUserIdAndStatus(userId, status));
    }

    @GetMapping("/user/{userId}/payment-status/{status}")
    public ResponseEntity<List<Test>> getTestsByUserIdAndPaymentStatus(
            @PathVariable Long userId,
            @PathVariable PaymentStatus status) {
        return ResponseEntity.ok(testService.getTestsByUserIdAndPaymentStatus(userId, status));
    }

    @GetMapping("/check-sample/{sampleCode}")
    public ResponseEntity<Boolean> existsBySampleCode(@PathVariable String sampleCode) {
        return ResponseEntity.ok(testService.existsBySampleCode(sampleCode));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<?> updateTestStatus(
            @PathVariable Long id,
            @RequestParam TestStatus status) {
        try {
            Test updatedTest = testService.updateTestStatus(id, status);
            return ResponseEntity.ok(updatedTest);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/payment-status")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<?> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam PaymentStatus status) {
        try {
            Test updatedTest = testService.updatePaymentStatus(id, status);
            return ResponseEntity.ok(updatedTest);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 