package adn_web.java_project.dto.review;

public class ReviewRequestDTO {
    private String userName;
    private int rating;
    private String comment;

    // Getters and setters
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
} 