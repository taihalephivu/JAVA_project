package adn_web.java_project.service;

import adn_web.java_project.dto.dashboard.CustomerDashboardDTO;

public interface DashboardService {
    CustomerDashboardDTO getCustomerDashboard(Long userId);
} 