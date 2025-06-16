package adn_web.java_project.service;

import adn_web.java_project.model.TestType;
import java.util.List;
import java.util.Optional;

public interface TestTypeService {
    TestType createTestType(TestType testType);
    TestType updateTestType(Long id, TestType testType);
    void deleteTestType(Long id);
    Optional<TestType> getTestTypeById(Long id);
    Optional<TestType> getTestTypeByName(String name);
    List<TestType> getAllTestTypes();
    List<TestType> getActiveTestTypes();
    boolean existsByName(String name);
} 