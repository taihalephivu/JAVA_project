package adn_web.java_project.service.impl;

import adn_web.java_project.model.TestType;
import adn_web.java_project.repository.TestTypeRepository;
import adn_web.java_project.service.TestTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TestTypeServiceImpl implements TestTypeService {

    private final TestTypeRepository testTypeRepository;

    @Autowired
    public TestTypeServiceImpl(TestTypeRepository testTypeRepository) {
        this.testTypeRepository = testTypeRepository;
    }

    @Override
    public TestType createTestType(TestType testType) {
        if (testTypeRepository.existsByName(testType.getName())) {
            throw new RuntimeException("Test type with name " + testType.getName() + " already exists");
        }
        return testTypeRepository.save(testType);
    }

    @Override
    public TestType updateTestType(Long id, TestType testType) {
        TestType existingTestType = testTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test type not found with id: " + id));

        // Check if the new name is already taken by another test type
        if (!existingTestType.getName().equals(testType.getName()) && 
            testTypeRepository.existsByName(testType.getName())) {
            throw new RuntimeException("Test type with name " + testType.getName() + " already exists");
        }

        existingTestType.setName(testType.getName());
        existingTestType.setDescription(testType.getDescription());
        existingTestType.setPrice(testType.getPrice());
        existingTestType.setProcessingTime(testType.getProcessingTime());
        existingTestType.setIsActive(testType.getIsActive());

        return testTypeRepository.save(existingTestType);
    }

    @Override
    public void deleteTestType(Long id) {
        if (!testTypeRepository.existsById(id)) {
            throw new RuntimeException("Test type not found with id: " + id);
        }
        testTypeRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TestType> getTestTypeById(Long id) {
        return testTypeRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TestType> getTestTypeByName(String name) {
        return testTypeRepository.findByName(name);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestType> getAllTestTypes() {
        return testTypeRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TestType> getActiveTestTypes() {
        return testTypeRepository.findByIsActive(true);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByName(String name) {
        return testTypeRepository.existsByName(name);
    }
} 