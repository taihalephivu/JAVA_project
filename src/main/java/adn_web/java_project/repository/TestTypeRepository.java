package adn_web.java_project.repository;

import adn_web.java_project.model.TestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestTypeRepository extends JpaRepository<TestType, Long> {
    Optional<TestType> findByName(String name);
    List<TestType> findByIsActive(Boolean isActive);
    boolean existsByName(String name);
} 