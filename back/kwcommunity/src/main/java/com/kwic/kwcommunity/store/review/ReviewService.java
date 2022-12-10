package com.kwic.kwcommunity.store.review;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.store.Store;
import com.kwic.kwcommunity.store.StoreRepository;
import com.kwic.kwcommunity.store.bookmark.BookmarkRepository;
import com.kwic.kwcommunity.store.dto.CreateReviewDTO;
import com.kwic.kwcommunity.store.tag.StoreTag;
import com.kwic.kwcommunity.store.tag.StoreTagRepository;
import com.kwic.kwcommunity.store.tag.Tag;
import com.kwic.kwcommunity.store.tag.TagRepository;
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
    private final TagRepository tagRepository;

    private final StoreTagRepository storeTagRepository;
    private final BookmarkRepository bookmarkRepository;

    @Transactional
    public String createReview(String userId, CreateReviewDTO dto) {
        LocalDateTime now = LocalDateTime.now();
        String formattedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        User user = userRepository.findById(userId).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 회원입니다"));
        Store store = storeRepository.findById(dto.getStoreId()).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 가게입니다"));
        Tag tag = tagRepository.findByTagId(dto.getTagId()).orElseThrow(() ->
                new IllegalArgumentException("존재하지 않는 태그입니다"));

        Review review = Review.builder()
                .store(store)
                .user(user)
                .contents(dto.getContents())
                .date(formattedNow)
                .grade(dto.getGrade()/20)
                .tag(tag)
                .build();

        reviewRepository.save(review);
        updateStore(store);
        createTag(store, tag);
        return formattedNow;
    }

    @Transactional
    public Long deleteReview(String userId, Long reviewId) {
        Review review = reviewRepository.findByReviewIdAndUser_UserId(reviewId, userId).orElseThrow(() ->
                new IllegalArgumentException("삭제할 권한이 없거나, 리뷰가 존재하지 않습니다"));
        reviewRepository.delete(review);
        updateStore(review.getStore());
        return reviewId;
    }

    public void updateStore(Store store) {
        double grade = reviewRepository.gradeAvg(store.getStoreId());
        long bookmarkCount = bookmarkRepository.countByStore_StoreId(store.getStoreId());
        store.setGrade(grade);
        store.setBookmarkCount(bookmarkCount);
        store.setReviewCount(store.getReviewList().size());
    }

    //5개 이상이면 태그 등록
    public void createTag(Store store, Tag tag) {
        long tagCount = reviewRepository.countByTag_TagId(tag.getTagId());
        if(tagCount >= 5) {
            if(!storeTagRepository.existsByStore_StoreIdAndTag_TagId(store.getStoreId(), tag.getTagId())) {
                StoreTag storeTag = StoreTag.builder()
                        .store(store)
                        .tag(tag)
                        .build();
                storeTagRepository.save(storeTag);
            }
        }
    }
}
