package com.kwic.kwcommunity.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyPostDTO {

    private Long postId;
    private String date;
    private String contents;
    private String category;

}