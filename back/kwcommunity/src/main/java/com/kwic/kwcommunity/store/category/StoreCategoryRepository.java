package com.kwic.kwcommunity.store.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreCategoryRepository extends JpaRepository<StoreCategory, Long> {
    Optional<StoreCategory> findByCategoryName(String name);
}
