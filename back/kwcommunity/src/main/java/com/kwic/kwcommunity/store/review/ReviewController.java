package com.kwic.kwcommunity.store.review;

import com.kwic.kwcommunity.ApiStatus;
import com.kwic.kwcommunity.ResponseDTO;
import com.kwic.kwcommunity.post.dto.PostIdDTO;
import com.kwic.kwcommunity.store.category.StoreCategory;
import com.kwic.kwcommunity.store.dto.CreateReviewDTO;
import com.kwic.kwcommunity.store.dto.ReviewIdDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteReview(@AuthenticationPrincipal User user, @RequestBody ReviewIdDTO dto) {
        Long id = reviewService.deleteReview(user.getUsername(), dto.getReviewId());
        return ResponseEntity.ok().body(id);
    }

}
