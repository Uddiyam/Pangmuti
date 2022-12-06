package com.kwic.kwcommunity.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewDTO {

    private Long storeId;

    @NotBlank
    private String contents;
    private int grade;
    private String tag;

}
