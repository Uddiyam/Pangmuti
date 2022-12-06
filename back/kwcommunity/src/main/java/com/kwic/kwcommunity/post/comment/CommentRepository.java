package com.kwic.kwcommunity.post.comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findByUser_UserIdAndCommentId(String userId, Long postId);
}
