package adn_web.java_project.model;

public enum TestStatus {
    PENDING,            // Đang chờ xử lý
    SAMPLE_COLLECTED,   // Đã thu thập mẫu
    IN_PROGRESS,        // Đang xử lý
    COMPLETED,          // Hoàn thành
    CANCELLED,          // Đã hủy
    FAILED             // Thất bại
} 