package adn_web.java_project.service;

import adn_web.java_project.model.Review;
import java.util.List;

public interface ReviewService {
    Review save(Review review);
    List<Review> getAll();
    List<Review> getApproved();
    Review approve(Long id);
    void delete(Long id);
} 