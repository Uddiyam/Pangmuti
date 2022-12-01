package com.kwic.kwcommunity.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreListDTO {

    private String storeName;
    private String storeImage;
    private String category;
    private String tag;
    private double grade;
    private int reviewCount;

}
