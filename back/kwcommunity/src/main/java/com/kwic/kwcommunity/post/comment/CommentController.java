package com.kwic.kwcommunity.post.comment;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.post.dto.CommentIdDTO;
import com.kwic.kwcommunity.post.dto.CreateCommentDTO;
import com.kwic.kwcommunity.post.dto.CreatePostDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@AuthenticationPrincipal User user, @RequestBody @Valid CreateCommentDTO dto) {
        Comment comment = commentService.createComment(user.getUsername(), dto);
        return ResponseEntity.ok().body(comment);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteComment(@AuthenticationPrincipal User user, @RequestBody CommentIdDTO dto) {
        Long id = commentService.deleteComment(user.getUsername(), dto.getCommentId());
        return ResponseEntity.ok().body(id);
    }
}
