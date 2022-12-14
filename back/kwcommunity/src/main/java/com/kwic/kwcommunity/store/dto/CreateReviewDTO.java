package com.kwic.kwcommunity.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewDTO {

    private Long storeId;

    @NotEmpty
    private String contents;
    private int grade;
    private Long tagId;

}
