package com.kwic.kwcommunity.post.dto;

import com.kwic.kwcommunity.post.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {

    private String nickname;
    private String date;
    private String contents;
    private String category;
    private boolean writer;
    private List<Comment> commentList;

}
