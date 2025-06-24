package adn_web.java_project.controller;

import adn_web.java_project.model.Notification;
import adn_web.java_project.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications() {
        List<Notification> notifications = notificationService.getNotificationsForUser(getCurrentUsername());
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getUnreadNotificationCount() {
        long count = notificationService.getUnreadNotificationCount(getCurrentUsername());
        return ResponseEntity.ok(Collections.singletonMap("count", count));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable Long id) {
        Notification notification = notificationService.markAsRead(id, getCurrentUsername());
        return ResponseEntity.ok(notification);
    }

    @PutMapping("/mark-all-as-read")
    public ResponseEntity<Void> markAllNotificationsAsRead() {
        notificationService.markAllAsRead(getCurrentUsername());
        return ResponseEntity.ok().build();
    }
} 