package com.kwic.kwcommunity.user.dto;

import com.kwic.kwcommunity.post.Post;
import com.kwic.kwcommunity.post.comment.Comment;
import com.kwic.kwcommunity.store.bookmark.Bookmark;
import com.kwic.kwcommunity.store.review.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyPageDTO {

    private List<Bookmark> bookmarkList;
    private List<Post> postList;
    private List<Comment> commentList;
    private List<Review> reviewList;

}
