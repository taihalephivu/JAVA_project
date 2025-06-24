package adn_web.java_project.service;

import adn_web.java_project.model.Notification;
import adn_web.java_project.model.User;

import java.util.List;

public interface NotificationService {

    List<Notification> getNotificationsForUser(String username);

    Notification markAsRead(Long notificationId, String username);

    void markAllAsRead(String username);

    Notification createNotification(User user, String message, String link);

    long getUnreadNotificationCount(String username);
} 