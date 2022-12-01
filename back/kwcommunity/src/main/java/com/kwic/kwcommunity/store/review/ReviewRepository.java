package com.kwic.kwcommunity.store.review;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.store.category.StoreCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Review findByStore_StoreId(String name);
    Page<Review> findByStore_StoreIdOrderByDateDesc(Long storeId, Pageable pageable);
}
