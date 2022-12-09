package com.kwic.kwcommunity.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findByContentsContainingOrderByDateDesc(String keyword, Pageable pageable);
    Page<Post> findAllByOrderByDateDesc(Pageable pageable);
    Page<Post> findByPostCategory_CategoryIdOrderByDateDesc(Long categoryId, Pageable pageable);
    Optional<Post> findByUser_UserIdAndPostId(String userId, Long postId);
    Optional<Post> findByPostId(Long postId);

}
