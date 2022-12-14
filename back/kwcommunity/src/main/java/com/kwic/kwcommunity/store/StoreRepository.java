package com.kwic.kwcommunity.store;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {

    Optional<Store> findByStoreId(Long storeId);

    List<Store> findAll();

    Page<Store> findAll(Pageable pageable);

    Page<Store> findByStoreCategory_CategoryId(Long categoryId, Pageable pageable);

    Page<Store> findByStoreTag_Tag_TagId(Long tagId, Pageable pageable);

    Page<Store> findByStoreCategory_CategoryIdAndStoreTag_Tag_TagId(Long categoryId, Long tagId, Pageable pageable);

    Page<Store> findByStoreNameContaining(String keyword, Pageable pageable);

}
