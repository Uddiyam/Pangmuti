package com.kwic.kwcommunity.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewDTO {

    private Long storeId;
    private Long userId;
    private String contents;
    private int grade;
    private String tag;

}
