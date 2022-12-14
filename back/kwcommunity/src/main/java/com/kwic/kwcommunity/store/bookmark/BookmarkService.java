package com.kwic.kwcommunity.store.bookmark;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.store.Store;
import com.kwic.kwcommunity.store.StoreRepository;
import com.kwic.kwcommunity.user.User;
import com.kwic.kwcommunity.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;

    public void createBookmark(String userId, Long storeId) {
        User user = userRepository.findByUserId(userId).orElseThrow(()->new IllegalArgumentException("존재하지 않는 회원입니다"));
        Store store = storeRepository.findByStoreId(storeId).orElseThrow(()->new IllegalArgumentException("존재하지 않는 가게입니다"));
        if(!bookmarkRepository.existsByStore_StoreIdAndUser_UserId(store.getStoreId(),user.getUserId())) {
            Bookmark bookmark = Bookmark.builder()
                    .user(user)
                    .store(store)
                    .build();
            bookmarkRepository.save(bookmark);
        }
    }

    @Transactional
    public Long deleteBookmark(String userId, Long storeId) {
        Bookmark bookmark = bookmarkRepository.findByUser_UserIdAndStore_StoreId(userId, storeId).orElseThrow(() ->
                new IllegalArgumentException("삭제할 권한이 없거나, 가게가 존재하지 않습니다"));
        bookmarkRepository.delete(bookmark);
        return bookmark.getBookmarkId();
    }
}
