package adn_web.java_project.service.impl;

import adn_web.java_project.model.TestPackage;
import adn_web.java_project.repository.TestPackageRepository;
import adn_web.java_project.service.TestPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestPackageServiceImpl implements TestPackageService {
    private final TestPackageRepository testPackageRepository;

    @Autowired
    public TestPackageServiceImpl(TestPackageRepository testPackageRepository) {
        this.testPackageRepository = testPackageRepository;
    }

    @Override
    public List<TestPackage> findAll() {
        return testPackageRepository.findAll();
    }

    @Override
    public Optional<TestPackage> findById(Long id) {
        return testPackageRepository.findById(id);
    }

    @Override
    public TestPackage save(TestPackage testPackage) {
        return testPackageRepository.save(testPackage);
    }

    @Override
    public void deleteById(Long id) {
        testPackageRepository.deleteById(id);
    }
} 