package adn_web.java_project.repository;

import adn_web.java_project.model.Test;
import adn_web.java_project.model.TestStatus;
import adn_web.java_project.model.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    Optional<Test> findBySampleCode(String sampleCode);
    List<Test> findByUserId(Long userId);
    List<Test> findByTestTypeId(Long testTypeId);
    List<Test> findByStatus(TestStatus status);
    List<Test> findByPaymentStatus(PaymentStatus paymentStatus);
    List<Test> findByUserIdAndStatus(Long userId, TestStatus status);
    List<Test> findBySampleCollectionDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    Page<Test> findByUserId(Long userId, Pageable pageable);
    boolean existsBySampleCode(String sampleCode);
    List<Test> findByUserIdAndPaymentStatus(Long userId, PaymentStatus status);

    // --- New methods for Dashboard ---
    long countByUserId(Long userId);
    long countByUserIdAndStatus(Long userId, TestStatus status);

    @Query("SELECT COALESCE(SUM(t.totalAmount), 0) FROM Test t WHERE t.user.id = :userId AND t.paymentStatus = 'PAID'")
    BigDecimal calculateTotalSpentByUserId(@Param("userId") Long userId);

    List<Test> findTop5ByUserIdOrderByCreatedAtDesc(Long userId);
} 