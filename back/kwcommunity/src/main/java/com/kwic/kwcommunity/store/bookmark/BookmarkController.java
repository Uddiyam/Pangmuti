package com.kwic.kwcommunity.store.bookmark;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.post.dto.CreatePostDTO;
import com.kwic.kwcommunity.post.dto.PostIdDTO;
import com.kwic.kwcommunity.store.dto.StoreIdDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("/api/bookmark")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/create")
    public ResponseEntity<?> createBookmark(@AuthenticationPrincipal User user, @RequestBody StoreIdDTO dto) {
        bookmarkService.createBookmark(user.getUsername(), dto.getStoreId());
        return ResponseEntity.ok().body("success");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteBookmark(@AuthenticationPrincipal User user, @RequestBody StoreIdDTO dto) {
        Long id = bookmarkService.deleteBookmark(user.getUsername(), dto.getStoreId());
        return ResponseEntity.ok().body(id);
    }
}
