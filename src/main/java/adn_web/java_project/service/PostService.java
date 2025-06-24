package adn_web.java_project.service;

import adn_web.java_project.dto.post.PostRequestDTO;
import adn_web.java_project.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PostService {
    Page<Post> getAllPosts(Pageable pageable);

    Optional<Post> getPostById(Long id);

    Post createPost(PostRequestDTO postRequestDTO, String username);

    Post updatePost(Long id, PostRequestDTO postRequestDTO);

    void deletePost(Long id);
} 