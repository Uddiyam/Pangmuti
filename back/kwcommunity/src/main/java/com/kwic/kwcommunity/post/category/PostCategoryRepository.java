package com.kwic.kwcommunity.post.category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository  extends JpaRepository<PostCategory, Long> {

    PostCategory findByCategoryId(Long id);
}
