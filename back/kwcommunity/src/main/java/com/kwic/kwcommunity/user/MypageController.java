package com.kwic.kwcommunity.user;

import com.kwic.kwcommunity.user.dto.MyPageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MypageController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getMyPage(@AuthenticationPrincipal User user) {
        MyPageDTO myPage = userService.getMyPage(user.getUsername());
        return ResponseEntity.ok().body(myPage);
    }
}
