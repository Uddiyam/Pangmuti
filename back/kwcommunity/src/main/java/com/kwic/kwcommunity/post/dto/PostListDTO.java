package com.kwic.kwcommunity.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostListDTO {

    private Long postId;
    private String nickname;
    private String date;
    private String contents;
    private String category;
    private long commentCount;

}
