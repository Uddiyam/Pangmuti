package com.kwic.kwcommunity.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommentDTO {
    private Long postId;

    @NotEmpty
    private String contents;
}
