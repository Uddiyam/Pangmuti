package com.kwic.kwcommunity.store;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.post.dto.PostListDTO;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {
    //TODO 어떤 카테고리 및 정렬기능이 눌렸는지
    private final StoreRepository storeRepository;
    private final ReviewRepository reviewRepository;
    private final StoreTagRepository storeTagRepository;

//    public List<StoreListDTO> getStoreList(Long userId) { //임시로 id 받는다고 해놓음 실제는 시큐리티 적용 예정
//        //TODO 토큰처리 필요
//        List<Store> storeList = storeRepository.findAll();
//
//        for(Store store : storeList) {
//            Review review = reviewRepository.findByStoreId(store.getStoreId().toString());
//
//        }
//
//    }

    public StoreDTO viewStore(ReqStoreDTO dto, Pageable pageable) {
        List<String> tagList = new ArrayList<String>();
        List<StoreTag> storeTag = storeTagRepository.findByStoreId(dto.getStoreId());
        for(StoreTag tag : storeTag) {
            if(tag.getTagCount() > 5) {
                tagList.add(tag.getTag().getTagName());
            }
        }
        Store store = storeRepository.findById(dto.getStoreId()).orElseThrow(()->new IllegalArgumentException("존재하지 않는 가게정보입니다"));
        Page<ReviewDTO> reviewList = pagingReview(dto.getStoreId(), pageable);
        return StoreDTO.builder()
                .storeId(store.getStoreId())
                .storeName(store.getStoreName())
                .storeImage(store.getStoreImage())
                .category(store.getStoreCategory().getCategoryName())
                .address(store.getAddress())
                .tagList(tagList)
                .maxPrice(store.getMaxPrice())
                .minPrice(store.getMinPrice())
                .latitude(store.getLatitude())
                .longitude(store.getLongitude())
                .phone(store.getPhone())
                .openTime(store.getOpenTime())
                .closeTime(store.getCloseTime())
                .menuImage(store.getMenuImage())
                .updateDate(store.getUpdateDate())
                .reviewList(reviewList)
                .build();
    }

    public Page<ReviewDTO> pagingReview(Long storeId, Pageable pageable) {
        Page<Review> page = reviewRepository.findByStoreIdOrderByDateDesc(storeId, pageable);
        return responseReviewList(page);
    }

    public Page<ReviewDTO> responseReviewList(Page<Review> pp) {
        return pp.map(
                review -> new ReviewDTO(review.getReviewId(), review.getUser().getNickname(),
                        review.getContents(), review.getDate(), review.getGrade(),
                        review.getTag(), review.getLikeCount()));
    }

}
