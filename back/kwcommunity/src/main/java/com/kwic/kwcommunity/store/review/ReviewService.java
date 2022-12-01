package com.kwic.kwcommunity.store.review;

import com.kwic.kwcommunity.post.dto.ReqPostDTO;
import com.kwic.kwcommunity.post.exception.NoSuchDataException;
import com.kwic.kwcommunity.store.Store;
import com.kwic.kwcommunity.store.StoreRepository;
import com.kwic.kwcommunity.store.dto.CreateReviewDTO;
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
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;

    //리뷰 등록(날짜 반환해줄까)
    public String createReview(CreateReviewDTO dto) {
        LocalDateTime now = LocalDateTime.now();
        String formattedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        User user = userRepository.findById(dto.getUserId()).orElseThrow();
        Store store = storeRepository.findById(dto.getStoreId()).orElseThrow();

        Review review = Review.builder()
                .store(store)
                .user(user)
                .contents(dto.getContents())
                .date(formattedNow)
                .grade(dto.getGrade())
                .tag(dto.getTag())
                .likeCount(0).build();

        reviewRepository.save(review);
        return formattedNow;
    }

    //TODO 리뷰삭제


}
