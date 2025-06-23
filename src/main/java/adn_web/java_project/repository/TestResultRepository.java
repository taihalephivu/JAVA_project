package adn_web.java_project.repository;

import adn_web.java_project.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    Optional<TestResult> findByTestId(Long testId);
    List<TestResult> findByPerformedById(Long performedById);
    List<TestResult> findByPerformedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    boolean existsByTestId(Long testId);
    List<TestResult> findByTest_User_Username(String username);
} 