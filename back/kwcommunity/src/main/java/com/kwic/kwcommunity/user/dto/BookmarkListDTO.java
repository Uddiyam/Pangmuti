package com.kwic.kwcommunity.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkListDTO {

    private Long storeId;
    private String storeName;
    private String storeImage;
    private String category;
    private double grade;

}
