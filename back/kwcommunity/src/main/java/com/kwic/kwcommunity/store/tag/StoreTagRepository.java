package com.kwic.kwcommunity.store.tag;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreTagRepository extends JpaRepository<StoreTag, Long> {

    List<StoreTag> findByStoreId(Long storeId);
    List<StoreTag> findByStoreIdAndTagId(Long storeId, Long tagId);
}
