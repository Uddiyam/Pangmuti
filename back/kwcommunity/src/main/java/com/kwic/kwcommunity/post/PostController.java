package com.kwic.kwcommunity.post;

import com.kwic.kwcommunity.ApiStatus;
import com.kwic.kwcommunity.ResponseDTO;
import com.kwic.kwcommunity.post.dto.*;
import com.kwic.kwcommunity.post.exception.NoSuchDataException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;


    @GetMapping
    public ResponseEntity<?> getPostList(@RequestParam Long categoryId, Pageable pageable) {
        Page<PostListDTO> postList = postService.viewPostList(categoryId, pageable);
        return ResponseEntity.ok().body(postList);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPost(@RequestParam String keyword, Pageable pageable) {
        Page<PostListDTO> postList = postService.searchPost(keyword, pageable);
        return ResponseEntity.ok().body(postList);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@AuthenticationPrincipal User user, @RequestBody @Valid CreatePostDTO dto) {
        Post post = postService.createPost(user.getUsername(), dto);
        return ResponseEntity.ok().body(post);
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getPostDetail(@AuthenticationPrincipal User user, @RequestParam Long postId) {
        PostDTO post = postService.viewPost(user.getUsername(), postId);
        return ResponseEntity.ok().body(post);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePost(@AuthenticationPrincipal User user, @RequestBody Long postId) {
        Long id = postService.deletePost(user.getUsername(), postId);
        return ResponseEntity.ok().body(id);
    }

}
