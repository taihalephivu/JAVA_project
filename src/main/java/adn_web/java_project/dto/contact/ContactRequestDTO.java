package adn_web.java_project.dto.contact;

import lombok.Data;

@Data
public class ContactRequestDTO {
    private String fullName;
    private String email;
    private String content;
} 