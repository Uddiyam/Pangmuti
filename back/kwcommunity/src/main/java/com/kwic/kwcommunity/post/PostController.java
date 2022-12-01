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
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;


    @GetMapping
    public ResponseEntity<?> getPostList(ReqPostListDTO dto, Pageable pageable) {
        Page<PostListDTO> postList = postService.viewPostList(dto, pageable);
        return ResponseEntity.ok().body(postList);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPost(SearchDTO dto, Pageable pageable) {
        Page<PostListDTO> postList = postService.searchPost(dto, pageable);
        return ResponseEntity.ok().body(postList);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody CreatePostDTO dto) {
        Post post = postService.createPost(dto);
        return ResponseEntity.ok().body(post);
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getPostDetail(ReqPostDTO reqPostDTO) {
        try {
            PostDTO post = postService.viewPost(reqPostDTO);
            return ResponseEntity.ok().body(post);
        } catch (IllegalArgumentException e) {
            ResponseDTO<Object> res = ResponseDTO.builder()
                    .status(ApiStatus.FAIL)
                    .error(e.getMessage())
                    .build();
            return ResponseEntity.ok().body(res);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePost(@RequestBody ReqPostDTO reqPostDTO) {
        try {
            Long postId = postService.deletePost(reqPostDTO);
            return ResponseEntity.ok().body(postId);
        } catch (NoSuchDataException e) {
            ResponseDTO<Object> res = ResponseDTO.builder()
                    .status(ApiStatus.FAIL)
                    .error(e.getMessage())
                    .build();
            return ResponseEntity.ok().body(res);
        }
    }

}
