package com.kwic.kwcommunity.store.review;

import com.kwic.kwcommunity.ApiStatus;
import com.kwic.kwcommunity.ResponseDTO;
import com.kwic.kwcommunity.store.category.StoreCategory;
import com.kwic.kwcommunity.store.dto.CreateReviewDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collections;

@RestController
@Slf4j
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@AuthenticationPrincipal User user, @RequestBody @Valid CreateReviewDTO dto){
        String date = reviewService.createReview(user.getUsername(), dto);
        ResponseDTO<Object> res = ResponseDTO.builder().status(ApiStatus.SUCCESS).data(Collections.singletonList(date)).build();
        return ResponseEntity.ok().body(res);
    }

}
