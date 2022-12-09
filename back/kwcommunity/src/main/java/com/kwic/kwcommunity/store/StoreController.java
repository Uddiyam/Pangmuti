package com.kwic.kwcommunity.store;

import com.kwic.kwcommunity.post.dto.PostListDTO;
import com.kwic.kwcommunity.store.dto.StoreDTO;
import com.kwic.kwcommunity.store.dto.StoreListDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public ResponseEntity<?> getStoreList(@RequestParam Long categoryId, @RequestParam Long tagId, Pageable pageable) {
        Page<StoreListDTO> storeList = storeService.getStoreList(categoryId, tagId, pageable);
        return ResponseEntity.ok().body(storeList);
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getStore(@AuthenticationPrincipal User user, @RequestParam Long storeId, Pageable pageable) {
        StoreDTO store = storeService.viewStore(user.getUsername(), storeId, pageable);
        return ResponseEntity.ok().body(store);
    }
}
