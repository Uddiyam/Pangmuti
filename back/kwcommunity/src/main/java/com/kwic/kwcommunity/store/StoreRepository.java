package com.kwic.kwcommunity.store;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {

    Optional<Store> findByStoreId(Long storeId);

    //카테고리 전체, 태그 전체일때 (완전 초기)
    Page<Store> findAll(Pageable pageable);
    //태그는 전체일때
    Page<Store> findByStoreCategory_CategoryId(Long categoryId, Pageable pageable);
    //카테고리, 태그 둘 다 선택했을 때
    Page<Store> findByStoreCategory_CategoryIdAndStoreTag_Tag_TagId(Long categoryId, Long tagId, Pageable pageable);

    Page<Store> findByStoreNameContaining(String keyword, Pageable pageable);


}
