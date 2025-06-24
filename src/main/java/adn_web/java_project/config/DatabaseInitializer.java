// File này đã được vô hiệu hóa để tránh lỗi khi Spring Boot kết nối database.
// Hibernate sẽ tự động tạo bảng khi backend khởi động.

package adn_web.java_project.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DatabaseInitializer {

    private final JdbcTemplate jdbcTemplate;

    @Value("${spring.datasource.username}")
    private String username;

    public DatabaseInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    @Transactional
    public void initialize() {
        // Create database if not exists
        jdbcTemplate.execute("IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'dna_test_db') " +
                "BEGIN " +
                "CREATE DATABASE dna_test_db; " +
                "END");

        // Grant permissions
        jdbcTemplate.execute("USE dna_test_db; " +
                "ALTER AUTHORIZATION ON DATABASE::dna_test_db TO " + username + ";");
    }
} 