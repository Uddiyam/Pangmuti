package com.kwic.kwcommunity.store.admin;

import com.kwic.kwcommunity.post.category.PostCategory;
import com.kwic.kwcommunity.post.category.PostCategoryRepository;
import com.kwic.kwcommunity.store.Store;
import com.kwic.kwcommunity.store.StoreRepository;
import com.kwic.kwcommunity.store.category.StoreCategory;
import com.kwic.kwcommunity.store.category.StoreCategoryRepository;
import com.kwic.kwcommunity.store.dto.MakeStoreDTO;
import com.kwic.kwcommunity.store.tag.Tag;
import com.kwic.kwcommunity.store.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final StoreCategoryRepository storeCategoryRepository;
    private final StoreRepository storeRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final TagRepository tagRepository;

    //카테고리 저장

    public void createCategory(PostCategory postCategory) {
        postCategoryRepository.save(postCategory);
    }

    public void createCategory(StoreCategory storeCategory) {
        storeCategoryRepository.save(storeCategory);
    }

    public void createTag(Tag tag) {
        tagRepository.save(tag);
    }

    //가게 저장
    public void createStore(MakeStoreDTO dto) {
        StoreCategory category = storeCategoryRepository.findByCategoryName(dto.getCategory()).orElseThrow(()->new IllegalArgumentException("해당 카테고리가 존재하지 않습니다"));
        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedNow = now.format(formatter);
        Store store = Store.builder()
                .storeName(dto.getStoreName())
                .storeImage(dto.getStoreImage())
                .storeCategory(category)
                .storeTag(null)
                .minPrice(dto.getMinPrice())
                .maxPrice(dto.getMaxPrice())
                .address(dto.getAddress())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .phone(dto.getPhone())
                .openTime(dto.getOpenTime())
                .closeTime(dto.getCloseTime())
                .menuImage(dto.getMenuImage())
                .updateDate(formattedNow)
                .reviewList(null)
                .build();
        storeRepository.save(store);
    }
}
