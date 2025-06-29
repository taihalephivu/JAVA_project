package adn_web.java_project.controller;

import adn_web.java_project.dto.review.ReviewRequestDTO;
import adn_web.java_project.dto.review.ReviewResponseDTO;
import adn_web.java_project.model.Review;
import adn_web.java_project.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // Tạo đánh giá mới
    @PostMapping
    public ReviewResponseDTO createReview(@RequestBody ReviewRequestDTO dto) {
        Review review = new Review();
        review.setUserName(dto.getUserName());
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        Review saved = reviewService.save(review);
        return toDTO(saved);
    }

    // Lấy tất cả hoặc chỉ đánh giá đã duyệt
    @GetMapping
    public List<ReviewResponseDTO> getReviews(@RequestParam(value = "approved", required = false) Boolean approved) {
        List<Review> reviews = (approved != null && approved) ? reviewService.getApproved() : reviewService.getAll();
        return reviews.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Admin duyệt đánh giá
    @PutMapping("/{id}/approve")
    public ReviewResponseDTO approveReview(@PathVariable Long id) {
        Review review = reviewService.approve(id);
        return toDTO(review);
    }

    // Admin xóa đánh giá
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.delete(id);
    }

    private ReviewResponseDTO toDTO(Review review) {
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setId(review.getId());
        dto.setUserName(review.getUserName());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setApproved(review.isApproved());
        return dto;
    }
} 