package com.kwic.kwcommunity.store.dto;

import com.kwic.kwcommunity.store.tag.StoreTag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreListDTO {

    private Long storeId;
    private String storeName;
    private String storeImage;
    private String category;
    private List<StoreTag> tagList;
    private double grade;       //총평점
    private int reviewCount;    //리뷰수
    private int bookmarkCount; //즐겨찾기 수

}
