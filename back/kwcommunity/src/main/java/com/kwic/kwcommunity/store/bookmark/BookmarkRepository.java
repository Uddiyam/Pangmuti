package com.kwic.kwcommunity.store.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    boolean existsByStore_StoreIdAndUser_UserId(Long storeId, String userId);

    Optional<Bookmark> findByUser_UserIdAndStore_StoreId(String userId, Long storeId);
}
