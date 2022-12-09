package com.kwic.kwcommunity.store;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.post.dto.PostListDTO;
import com.kwic.kwcommunity.store.bookmark.BookmarkRepository;
import com.kwic.kwcommunity.store.dto.*;
import com.kwic.kwcommunity.store.review.Review;
import com.kwic.kwcommunity.store.review.ReviewRepository;
import com.kwic.kwcommunity.store.tag.StoreTag;
import com.kwic.kwcommunity.store.tag.StoreTagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
    private final ReviewRepository reviewRepository;
    private final StoreTagRepository storeTagRepository;
    private final BookmarkRepository bookmarkRepository;

    public Page<StoreListDTO> getStoreList(Long categoryId, Long tagId, Pageable pageable) {
        Page<Store> postPage;
        if(categoryId == 1 && tagId == 1) {
            postPage = storeRepository.findAll(pageable);
        }
        else if(tagId == 1){
            postPage = storeRepository.findByStoreCategory_CategoryId(categoryId, pageable);
        }
        else {
            postPage = storeRepository.findByStoreCategory_CategoryIdAndStoreTag_Tag_TagId(categoryId, tagId, pageable);
        }
        return responseStoreList(postPage);
    }

    public StoreDTO viewStore(String userId, Long storeId, Pageable pageable) {
        boolean isBookmark = bookmarkRepository.existsByStore_StoreIdAndUser_UserId(storeId, userId);
        Store store = storeRepository.findByStoreId(storeId).orElseThrow(()->new IllegalArgumentException("존재하지 않는 가게정보입니다"));
        Page<ReviewDTO> reviewList = pagingReview(storeId, pageable);
        return StoreDTO.builder()
                .storeId(store.getStoreId())
                .storeName(store.getStoreName())
                .storeImage(store.getStoreImage())
                .category(store.getStoreCategory().getCategoryName())
                .address(store.getAddress())
                .tagList(store.getStoreTag())
                .maxPrice(store.getMaxPrice())
                .minPrice(store.getMinPrice())
                .latitude(store.getLatitude())
                .longitude(store.getLongitude())
                .phone(store.getPhone())
                .openTime(store.getOpenTime())
                .closeTime(store.getCloseTime())
                .menuImage(store.getMenuImage())
                .updateDate(store.getUpdateDate())
                .grade(store.getGrade())
                .isBookmark(isBookmark)
                .reviewList(reviewList)
                .build();
    }

    public Page<ReviewDTO> pagingReview(Long storeId, Pageable pageable) {
        Page<Review> page = reviewRepository.findByStore_StoreIdOrderByDateDesc(storeId, pageable);
        return responseReviewList(page);
    }

    public Page<ReviewDTO> responseReviewList(Page<Review> pp) {
        return pp.map(
                review -> new ReviewDTO(review.getReviewId(), review.getUser().getNickname(),
                        review.getContents(), review.getDate(), review.getGrade(),
                        review.getTag().getTagName(), review.getLikeCount()));
    }

    public Page<StoreListDTO> responseStoreList(Page<Store> pp) {
        return pp.map(
                store -> new StoreListDTO(store.getStoreName(), store.getStoreImage(), store.getStoreCategory().getCategoryName(),
                        store.getStoreTag(), store.getGrade(), store.getReviewCount(), store.getBookmarkCount()));
    }

}
