package com.kwic.kwcommunity.post;

import com.kwic.kwcommunity.post.category.PostCategory;
import com.kwic.kwcommunity.post.category.PostCategoryRepository;
import com.kwic.kwcommunity.post.dto.*;
import com.kwic.kwcommunity.post.exception.NoSuchDataException;
import com.kwic.kwcommunity.user.User;
import com.kwic.kwcommunity.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final UserRepository userRepository;


    public Page<PostListDTO> viewPostList(Long categoryId, Pageable pageable) {
        Page<Post> postPage;
        if(categoryId == 1) {
            postPage = postRepository.findAllByOrderByDateDesc(pageable);
        }
        else {
            postPage = postRepository.findByPostCategory_CategoryIdOrderByDateDesc(categoryId, pageable);
        }
        return responsePostList(postPage);
    }

    public Page<PostListDTO> searchPost(String keyword, Pageable pageable) {
        Page<Post> boardList = postRepository.findByContentsContainingOrderByDateDesc(keyword, pageable);
        return responsePostList(boardList);
    }

    public Post createPost(String userId, CreatePostDTO createPostDTO) {
        LocalDateTime now = LocalDateTime.now();
        String formattedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        PostCategory postCategory = postCategoryRepository.findByCategoryId(createPostDTO.getCategoryId());
        User user = userRepository.findByUserId(userId).orElseThrow();

        Post post = Post.builder().contents(createPostDTO.getContents())
                .date(formattedNow)
                .commentList(null)
                .postCategory(postCategory)
                .user(user)
                .build();

        postRepository.save(post);

        return post;
    }

    public PostDTO viewPost(String userId, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(()->new IllegalArgumentException("존재하지 않는 게시글입니다"));
        boolean isWriter = false;
        if(Objects.equals(userId, post.getUser().getUserId())) {
            isWriter = true;
        }
        return new PostDTO(post.getUser().getNickname(), post.getDate(), post.getContents(),
                post.getPostCategory().getCategoryName(), isWriter, post.getCommentList());
    }

    @Transactional
    public Long deletePost(String userId, Long postId) {
        Post post = postRepository.findByUser_UserIdAndPostId(userId, postId).orElseThrow(() ->
                new IllegalArgumentException("삭제할 권한이 없거나, 게시글이 존재하지 않습니다"));
        postRepository.delete(post);
        return postId;
    }

    public Page<PostListDTO> responsePostList(Page<Post> pp) {
        return pp.map(
                post -> new PostListDTO(post.getPostId(), post.getUser().getNickname(), post.getDate(),
                        post.getContents(), post.getPostCategory().getCategoryName()));
    }


}
