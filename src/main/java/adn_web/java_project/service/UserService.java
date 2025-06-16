package adn_web.java_project.service;

import adn_web.java_project.model.User;
import adn_web.java_project.dto.auth.SignupRequest;

public interface UserService {
    User createUser(SignupRequest signupRequest);
    User findByUsername(String username);
    User findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
} 