package adn_web.java_project.service;

import adn_web.java_project.dto.auth.SignupRequest;
import adn_web.java_project.model.Role;
import adn_web.java_project.model.User;
import adn_web.java_project.repository.UserRepository;
import adn_web.java_project.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser() {
        // Arrange
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser");
        signupRequest.setEmail("test@example.com");
        signupRequest.setPassword("password");
        signupRequest.setRole(Role.ROLE_CUSTOMER);

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        User createdUser = userService.createUser(signupRequest);

        // Assert
        assertNotNull(createdUser);
        assertEquals(signupRequest.getUsername(), createdUser.getUsername());
        assertEquals(signupRequest.getEmail(), createdUser.getEmail());
        assertEquals("encodedPassword", createdUser.getPassword());
        assertEquals(signupRequest.getRole(), createdUser.getRole());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testFindByUsername() {
        // Arrange
        String username = "testuser";
        User user = new User();
        user.setUsername(username);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        // Act
        User foundUser = userService.findByUsername(username);

        // Assert
        assertNotNull(foundUser);
        assertEquals(username, foundUser.getUsername());
        verify(userRepository).findByUsername(username);
    }

    @Test
    void testExistsByUsername() {
        // Arrange
        String username = "testuser";
        when(userRepository.existsByUsername(username)).thenReturn(true);

        // Act
        boolean exists = userService.existsByUsername(username);

        // Assert
        assertTrue(exists);
        verify(userRepository).existsByUsername(username);
    }
}