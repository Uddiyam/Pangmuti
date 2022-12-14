package com.kwic.kwcommunity.post.comment;

import com.kwic.kwcommunity.store.review.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findByUser_UserIdAndCommentId(String userId, Long postId);
    Page<Comment> findByPost_PostId(Long postId, Pageable pageable);

    Page<Comment> findByUser_UserId(String userId, Pageable pageable);
}
