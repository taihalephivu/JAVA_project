package adn_web.java_project.controller;

import adn_web.java_project.model.User;
import adn_web.java_project.dto.auth.LoginRequest;
import adn_web.java_project.dto.auth.SignupRequest;
import adn_web.java_project.security.JwtService;
import adn_web.java_project.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);
        
        User user = userService.findByUsername(userDetails.getUsername());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody SignupRequest signupRequest) {
        try {
            if (userService.existsByUsername(signupRequest.getUsername())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Tên người dùng đã tồn tại!");
                return ResponseEntity.badRequest().body(response);
            }
            if (userService.existsByEmail(signupRequest.getEmail())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Email đã được sử dụng!");
                return ResponseEntity.badRequest().body(response);
            }
            
            User user = userService.createUser(signupRequest);

            // Automatically log in the user after registration
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signupRequest.getUsername(),
                            signupRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtService.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Đã xảy ra lỗi trong quá trình đăng ký: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 