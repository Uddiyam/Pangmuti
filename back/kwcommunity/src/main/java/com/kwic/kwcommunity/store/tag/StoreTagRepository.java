package com.kwic.kwcommunity.store.tag;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreTagRepository extends JpaRepository<StoreTag, Long> {

    List<StoreTag> findByStore_StoreId(Long storeId);
    List<StoreTag> findByStore_StoreIdAndTag_TagId(Long storeId, Long tagId);
}
