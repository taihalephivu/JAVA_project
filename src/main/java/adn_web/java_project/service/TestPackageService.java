package adn_web.java_project.service;

import adn_web.java_project.model.TestPackage;
import java.util.List;
import java.util.Optional;

public interface TestPackageService {
    List<TestPackage> findAll();
    Optional<TestPackage> findById(Long id);
    TestPackage save(TestPackage testPackage);
    void deleteById(Long id);
} 