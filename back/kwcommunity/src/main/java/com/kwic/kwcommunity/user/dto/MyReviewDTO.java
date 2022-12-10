package com.kwic.kwcommunity.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyReviewDTO {

    private Long reviewId;
    private String contents;
    private String date;
    private int grade;
    private String tag;

}