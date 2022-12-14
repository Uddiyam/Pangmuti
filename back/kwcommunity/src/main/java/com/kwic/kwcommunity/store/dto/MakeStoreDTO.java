package com.kwic.kwcommunity.store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MakeStoreDTO {

    private String storeName;
    private String storeImage;
    private String category;
    private double minPrice;
    private double maxPrice;
    private String address;
    private double latitude; //위도
    private double longitude; //경도
    private String phone;
    private String openTime;
    private String closeTime;
    private String menuImage;

}
