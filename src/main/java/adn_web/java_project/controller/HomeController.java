package adn_web.java_project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> home() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to DNA Testing Service API");
        response.put("status", "running");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/error")
    public ResponseEntity<Map<String, String>> error() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "An error occurred");
        response.put("status", "error");
        return ResponseEntity.ok(response);
    }
} 