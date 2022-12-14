package com.kwic.kwcommunity.user;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.post.comment.Comment;
import com.kwic.kwcommunity.post.dto.PostListDTO;
import com.kwic.kwcommunity.store.Store;
import com.kwic.kwcommunity.store.StoreRepository;
import com.kwic.kwcommunity.store.bookmark.Bookmark;
import com.kwic.kwcommunity.store.review.Review;
import com.kwic.kwcommunity.user.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;

    public MyPageDTO getMyPage(String userId) {
        User user = userCheck(userId);
        return MyPageDTO.builder()
                .nickname(user.getNickname())
                .email(user.getEmail())
                .build();
    }

    @Transactional
    public String updateNickname(String userId, String nickname) {
        User user = userCheck(userId);
        if(userRepository.existsByNickname(nickname)) {
            return "이미 존재하는 닉네임";
        } else {
            user.setNickname(nickname);
            return user.getNickname();
        }
    }

    public Page<BookmarkListDTO> getMyBookmark(String userId, Pageable pageable) {
        User user = userCheck(userId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), user.getBookmarkList().size());
        Page<Bookmark> bookmarkPage = new PageImpl<>(user.getBookmarkList().subList(start, end), pageRequest, user.getBookmarkList().size());
        return responseBookmarkList(bookmarkPage);
    }

    public Page<MyPostDTO> getMyPost(String userId, Pageable pageable) {
        User user = userCheck(userId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), user.getPostList().size());
        Page<Post> postPage = new PageImpl<>(user.getPostList().subList(start, end), pageRequest, user.getPostList().size());
        return responsePostList(postPage);
    }

    public Page<MyReviewDTO> getMyReview(String userId, Pageable pageable) {
        User user = userCheck(userId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), user.getReviewList().size());
        Page<Review> reviewPage = new PageImpl<>(user.getReviewList().subList(start, end), pageRequest, user.getReviewList().size());
        return responseReviewList(reviewPage);
    }

    public Page<MyCommentDTO> getMyComment(String userId, Pageable pageable) {
        User user = userCheck(userId);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), user.getCommentList().size());
        Page<Comment> commentPage = new PageImpl<>(user.getCommentList().subList(start, end), pageRequest, user.getCommentList().size());
        return responseCommentList(commentPage);
    }

    public List<String> getHome() {
        return getRandomStore();
    }

    public List<String> getRandomStore() {
        List<Store> storeList = storeRepository.findAll();
        List<String> imageList = new ArrayList<>();
        Collections.shuffle(storeList);
        for(int i = 0; i < 6; i++) {
            imageList.add(storeList.get(i).getStoreImage());
        }
        return imageList;
    }

    public Page<BookmarkListDTO> responseBookmarkList(Page<Bookmark> pp) {
        return pp.map(
                store -> new BookmarkListDTO(store.getStore().getStoreId(), store.getStore().getStoreName(),
                        store.getStore().getStoreImage(), store.getStore().getStoreCategory().getCategoryName(),
                        Math.round(store.getStore().getGrade()*100)/100.0));
    }

    public Page<MyReviewDTO> responseReviewList(Page<Review> pp) {
        return pp.map(
                review -> new MyReviewDTO(review.getReviewId(), review.getContents(), review.getDate(), review.getGrade(), review.getTag().getTagName()));
    }

    public Page<MyPostDTO> responsePostList(Page<Post> pp) {
        return pp.map(
                post -> new MyPostDTO(post.getPostId(), post.getDate(), post.getContents(), post.getPostCategory().getCategoryName()));
    }

    public Page<MyCommentDTO> responseCommentList(Page<Comment> pp) {
        return pp.map(
                comment -> new MyCommentDTO(comment.getCommentId(), comment.getContents(), comment.getDate()));
    }

    public User userCheck(String userId) {
        return userRepository.findByUserId(userId).orElseThrow(()->new IllegalArgumentException("존재하지 않는 회원입니다"));
    }



}
