package adn_web.java_project.controller;

import adn_web.java_project.model.TestPackage;
import adn_web.java_project.service.TestPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:3000")
public class TestPackageController {
    private final TestPackageService testPackageService;

    @Autowired
    public TestPackageController(TestPackageService testPackageService) {
        this.testPackageService = testPackageService;
    }

    // Public: Lấy tất cả gói
    @GetMapping
    public ResponseEntity<List<TestPackage>> getAllPackages() {
        return ResponseEntity.ok(testPackageService.findAll());
    }

    // Public: Lấy gói theo id
    @GetMapping("/{id}")
    public ResponseEntity<TestPackage> getPackageById(@PathVariable Long id) {
        Optional<TestPackage> pkg = testPackageService.findById(id);
        return pkg.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Admin: Thêm mới gói
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TestPackage> createPackage(@RequestBody TestPackage testPackage) {
        return ResponseEntity.status(201).body(testPackageService.save(testPackage));
    }

    // Admin: Cập nhật gói
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TestPackage> updatePackage(@PathVariable Long id, @RequestBody TestPackage testPackage) {
        Optional<TestPackage> existing = testPackageService.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();
        testPackage.setId(id);
        return ResponseEntity.ok(testPackageService.save(testPackage));
    }

    // Admin: Xóa gói
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        if (testPackageService.findById(id).isEmpty()) return ResponseEntity.notFound().build();
        testPackageService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 