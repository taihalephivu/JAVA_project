package adn_web.java_project.service.impl;

import adn_web.java_project.dto.post.PostRequestDTO;
import adn_web.java_project.model.Post;
import adn_web.java_project.model.User;
import adn_web.java_project.repository.PostRepository;
import adn_web.java_project.repository.UserRepository;
import adn_web.java_project.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    @Override
    @Transactional
    public Post createPost(PostRequestDTO postRequestDTO, String username) {
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Author (user) not found: " + username));

        Post post = new Post();
        post.setTitle(postRequestDTO.getTitle());
        post.setContent(postRequestDTO.getContent());
        post.setAuthor(author);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    @Override
    @Transactional
    public Post updatePost(Long id, PostRequestDTO postRequestDTO) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));

        existingPost.setTitle(postRequestDTO.getTitle());
        existingPost.setContent(postRequestDTO.getContent());
        existingPost.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(existingPost);
    }

    @Override
    @Transactional
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new EntityNotFoundException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }
} 