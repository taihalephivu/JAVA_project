package adn_web.java_project.repository;

import adn_web.java_project.model.TestPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestPackageRepository extends JpaRepository<TestPackage, Long> {
} 