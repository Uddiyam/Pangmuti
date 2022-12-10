package com.kwic.kwcommunity.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyCommentDTO {
    private Long commentId;
    private String contents;
    private String date;
}