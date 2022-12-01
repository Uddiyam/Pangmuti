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

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostCategoryRepository postCategoryRepository;
    private final UserRepository userRepository;

    //TODO 다 토큰처리 필요. 아직 안되어있음

    public Page<PostListDTO> viewPostList(ReqPostListDTO dto, Pageable pageable) {
        Page<Post> postPage;
        if(dto.getCategoryId() == 1) {
            postPage = postRepository.findAllByOrderByDateDesc(pageable);
        }
        else {
            postPage = postRepository.findByPostCategory_CategoryIdOrderByDateDesc(dto.getCategoryId(), pageable);
        }
        return responsePostList(postPage);
    }

    public Page<PostListDTO> searchPost(SearchDTO dto, Pageable pageable) {
        Page<Post> boardList = postRepository.findByContentsContainingOrderByDateDesc(dto.getKeyword(), pageable);
        return responsePostList(boardList);
    }

    public Post createPost(CreatePostDTO createPostDTO) {
        LocalDateTime now = LocalDateTime.now();
        String formattedNow = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        PostCategory postCategory = postCategoryRepository.findByCategoryId(createPostDTO.getCategoryId());
        User user = userRepository.findByUserId(createPostDTO.getUserId());

        Post post = Post.builder().contents(createPostDTO.getContents())
                .date(formattedNow)
                .commentList(null)
                .postCategory(postCategory)
                .user(user)
                .build();

        postRepository.save(post);

        return post;
    }

    public PostDTO viewPost(ReqPostDTO reqPostDTO) {
        Post post = postRepository.findById(reqPostDTO.getPostId()).orElseThrow(()->new IllegalArgumentException("존재하지 않는 게시글입니다"));
        return new PostDTO(post.getUser().getNickname(), post.getDate(), post.getContents(), post.getPostCategory().getCategoryName(), post.getCommentList());
    }

    @Transactional
    public Long deletePost(ReqPostDTO reqPostDTO) {
        if(postRepository.existsByUser_UserIdAndPostId(reqPostDTO.getUserId(), reqPostDTO.getPostId())) {
            postRepository.deleteByPostId(reqPostDTO.getUserId());
        }
        else {
            throw new NoSuchDataException("삭제할 권한이 없거나, 게시글이 존재하지 않습니다");
        }
        return reqPostDTO.getPostId();
    }

    public Page<PostListDTO> responsePostList(Page<Post> pp) {
        return pp.map(
                post -> new PostListDTO(post.getUser().getNickname(), post.getDate(),
                        post.getContents(), post.getPostCategory().getCategoryName()));
    }


}
