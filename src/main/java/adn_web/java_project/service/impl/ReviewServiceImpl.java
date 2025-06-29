package adn_web.java_project.service.impl;

import adn_web.java_project.model.Review;
import adn_web.java_project.repository.ReviewRepository;
import adn_web.java_project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review save(Review review) {
        review.setCreatedAt(LocalDateTime.now());
        review.setApproved(false);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAll() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getApproved() {
        return reviewRepository.findByApproved(true);
    }

    @Override
    public Review approve(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow();
        review.setApproved(true);
        return reviewRepository.save(review);
    }

    @Override
    public void delete(Long id) {
        reviewRepository.deleteById(id);
    }
} 