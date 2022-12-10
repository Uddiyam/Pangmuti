package com.kwic.kwcommunity.user;

import com.kwic.kwcommunity.user.dto.*;
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
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getMyPage(@AuthenticationPrincipal User user) {
        MyPageDTO myPage = myPageService.getMyPage(user.getUsername());
        return ResponseEntity.ok().body(myPage);
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkNickname(@RequestBody @Valid NicknameDTO dto) {
        boolean check = userService.checkNickname(dto.getNickname());
        return ResponseEntity.ok().body(check);
    }

    @PutMapping("/change")
    public ResponseEntity<?> updateNickname(@AuthenticationPrincipal User user, @RequestBody @Valid NicknameDTO dto) {
        String name = myPageService.updateNickname(user.getUsername(), dto.getNickname());
        return ResponseEntity.ok().body(name);
    }

    @GetMapping("/bookmark")
    public ResponseEntity<?> getMyBookmark(@AuthenticationPrincipal User user, Pageable pageable) {
        Page<BookmarkListDTO> myPage = myPageService.getMyBookmark(user.getUsername(), pageable);
        return ResponseEntity.ok().body(myPage);
    }

    @GetMapping("/review")
    public ResponseEntity<?> getMyReview(@AuthenticationPrincipal User user, Pageable pageable) {
        Page<MyReviewDTO> myPage = myPageService.getMyReview(user.getUsername(), pageable);
        return ResponseEntity.ok().body(myPage);
    }

    @GetMapping("/post")
    public ResponseEntity<?> getMyPost(@AuthenticationPrincipal User user, Pageable pageable) {
        Page<MyPostDTO> myPage = myPageService.getMyPost(user.getUsername(), pageable);
        return ResponseEntity.ok().body(myPage);
    }

    @GetMapping("/comment")
    public ResponseEntity<?> getMyComment(@AuthenticationPrincipal User user, Pageable pageable) {
        Page<MyCommentDTO> myPage = myPageService.getMyComment(user.getUsername(), pageable);
        return ResponseEntity.ok().body(myPage);
    }

}
