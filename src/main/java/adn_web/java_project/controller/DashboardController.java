package adn_web.java_project.controller;

import adn_web.java_project.dto.dashboard.CustomerDashboardDTO;
import adn_web.java_project.model.User;
import adn_web.java_project.service.DashboardService;
import adn_web.java_project.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserService userService;

    @GetMapping("/customer")
    public ResponseEntity<CustomerDashboardDTO> getCustomerDashboard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User currentUser = userService.findByUsername(username);
        
        CustomerDashboardDTO dashboardData = dashboardService.getCustomerDashboard(currentUser.getId());
        return ResponseEntity.ok(dashboardData);
    }
} 