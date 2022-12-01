package com.kwic.kwcommunity.store.admin;

import com.kwic.kwcommunity.ApiStatus;
import com.kwic.kwcommunity.ResponseDTO;
import com.kwic.kwcommunity.post.category.PostCategory;
import com.kwic.kwcommunity.store.category.StoreCategory;
import com.kwic.kwcommunity.store.dto.MakeStoreDTO;
import com.kwic.kwcommunity.store.tag.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/store/category")
    public ResponseEntity<?> createCategory(@RequestBody StoreCategory category){
        adminService.createCategory(category);
        ResponseDTO<Object> res = ResponseDTO.builder().status(ApiStatus.SUCCESS).build();
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/post/category")
    public ResponseEntity<?> createCategory(@RequestBody PostCategory category){
        adminService.createCategory(category);
        ResponseDTO<Object> res = ResponseDTO.builder().status(ApiStatus.SUCCESS).build();
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/tag")
    public ResponseEntity<?> createTag(@RequestBody Tag tag){
        adminService.createTag(tag);
        ResponseDTO<Object> res = ResponseDTO.builder().status(ApiStatus.SUCCESS).build();
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/store")
    public ResponseEntity<?> createStore(@RequestBody MakeStoreDTO dto){
        adminService.createStore(dto);
        ResponseDTO<Object> res = ResponseDTO.builder().status(ApiStatus.SUCCESS).build();
        return ResponseEntity.ok().body(res);
    }
}
