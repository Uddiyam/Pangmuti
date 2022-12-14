package com.kwic.kwcommunity.store.review;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.store.category.StoreCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByReviewIdAndUser_UserId(Long reviewId, String userId);
    Page<Review> findByStore_StoreId(Long storeId, Pageable pageable);

    @Query(value = "SELECT ifnull(avg(grade),0) grade FROM kwcommu.review where store_id = :storeId",nativeQuery = true)
    double gradeAvg(@Param("storeId") Long storeId);

    long countByStore_StoreIdAndTag_TagId(Long store, Long tag);
}
