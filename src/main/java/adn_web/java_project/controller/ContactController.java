package adn_web.java_project.controller;

import adn_web.java_project.dto.contact.ContactRequestDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @PostMapping
    public ResponseEntity<?> receiveContactMessage(@RequestBody ContactRequestDTO contactRequest) {
        // In a real application, you would send an email, save to a database, etc.
        // For now, we just log the message.
        logger.info("Received contact message from: {} ({})", contactRequest.getFullName(), contactRequest.getEmail());
        logger.info("Message content: {}", contactRequest.getContent());

        return ResponseEntity.ok(Map.of("message", "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể."));
    }
} 