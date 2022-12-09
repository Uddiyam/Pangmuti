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

    @Query("SELECT avg(grade) FROM Review where store.storeId = :storeId")
    double gradeAvg(@Param("storeId") Long storeId);

    long countByTag_TagId(Long tag);
}
