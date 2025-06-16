package adn_web.java_project.controller;

import adn_web.java_project.dto.test.TestTypeRequest;
import adn_web.java_project.dto.test.TestTypeResponse;
import adn_web.java_project.model.TestType;
import adn_web.java_project.service.TestTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/test-types")
@CrossOrigin(origins = "http://localhost:3000")
public class TestTypeController {

    private final TestTypeService testTypeService;

    @Autowired
    public TestTypeController(TestTypeService testTypeService) {
        this.testTypeService = testTypeService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createTestType(@Valid @RequestBody TestTypeRequest request) {
        try {
            TestType testType = new TestType();
            testType.setName(request.getName());
            testType.setDescription(request.getDescription());
            testType.setPrice(BigDecimal.valueOf(request.getPrice()));
            testType.setProcessingTime(request.getDuration());
            testType.setIsActive(request.getIsActive());

            TestType createdTestType = testTypeService.createTestType(testType);
            return ResponseEntity.ok(mapToResponse(createdTestType));
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateTestType(
            @PathVariable Long id,
            @Valid @RequestBody TestTypeRequest request) {
        try {
            TestType testType = new TestType();
            testType.setName(request.getName());
            testType.setDescription(request.getDescription());
            testType.setPrice(BigDecimal.valueOf(request.getPrice()));
            testType.setProcessingTime(request.getDuration());
            testType.setIsActive(request.getIsActive());

            TestType updatedTestType = testTypeService.updateTestType(id, testType);
            return ResponseEntity.ok(mapToResponse(updatedTestType));
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTestType(@PathVariable Long id) {
        try {
            testTypeService.deleteTestType(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Test type deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTestTypeById(@PathVariable Long id) {
        return testTypeService.getTestTypeById(id)
                .map(testType -> ResponseEntity.ok(mapToResponse(testType)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getTestTypeByName(@PathVariable String name) {
        return testTypeService.getTestTypeByName(name)
                .map(testType -> ResponseEntity.ok(mapToResponse(testType)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<TestTypeResponse>> getAllTestTypes() {
        List<TestTypeResponse> response = testTypeService.getAllTestTypes().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    public ResponseEntity<List<TestTypeResponse>> getActiveTestTypes() {
        List<TestTypeResponse> response = testTypeService.getActiveTestTypes().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    private TestTypeResponse mapToResponse(TestType testType) {
        TestTypeResponse response = new TestTypeResponse();
        response.setId(testType.getId());
        response.setName(testType.getName());
        response.setDescription(testType.getDescription());
        response.setPrice(testType.getPrice().doubleValue());
        response.setDuration(testType.getProcessingTime());
        response.setIsActive(testType.getIsActive());
        response.setCreatedAt(testType.getCreatedAt());
        response.setUpdatedAt(testType.getUpdatedAt());
        return response;
    }
} 