package com.kwic.kwcommunity.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {

    private Long reviewId;
    private String nickname;
    private String contents;
    private String date;
    private int grade;
    private String tag;
    private boolean isMyReview;

}
