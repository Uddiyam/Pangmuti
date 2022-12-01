package com.kwic.kwcommunity.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqPostListDTO {

    private Long userId;
    private Long categoryId;

}