package adn_web.java_project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    // TODO: Inject NotificationService

    @GetMapping
    public ResponseEntity<?> getNotifications() {
        // TODO: Implement service call to get notifications for the current user
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markNotificationAsRead(@PathVariable Long id) {
        // TODO: Implement service call
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/mark-all-as-read")
    public ResponseEntity<?> markAllNotificationsAsRead() {
        // TODO: Implement service call
        return ResponseEntity.ok().build();
    }
} 