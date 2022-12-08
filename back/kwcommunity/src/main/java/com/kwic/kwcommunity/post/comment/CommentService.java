package com.kwic.kwcommunity.post.comment;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.post.PostRepository;
import com.kwic.kwcommunity.post.dto.CommentDTO;
import com.kwic.kwcommunity.post.dto.CreateCommentDTO;
import com.kwic.kwcommunity.user.User;
import com.kwic.kwcommunity.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    //댓글생성
    public Comment createComment(String userId, CreateCommentDTO dto) {
        LocalDateTime now = LocalDateTime.now();
        String formattedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Post post = postRepository.findByPostId(dto.getPostId()).orElseThrow();
        User user = userRepository.findByUserId(userId).orElseThrow();
        Comment comment = Comment.builder()
                .contents(dto.getContents())
                .date(formattedNow)
                .post(post)
                .user(user)
                .build();
        return commentRepository.save(comment);
    }

    //댓글삭제
    @Transactional
    public Long deleteComment(String userId, Long commentId) {
        Comment comment = commentRepository.findByUser_UserIdAndCommentId(userId, commentId).orElseThrow(() ->
                new IllegalArgumentException("삭제할 권한이 없거나, 댓글이 존재하지 않습니다"));
        commentRepository.delete(comment);
        return commentId;
    }
}
