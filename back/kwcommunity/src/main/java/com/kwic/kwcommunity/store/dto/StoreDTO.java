package com.kwic.kwcommunity.store.dto;

import com.kwic.kwcommunity.post.comment.Comment;
import com.kwic.kwcommunity.store.review.Review;
import com.kwic.kwcommunity.store.tag.StoreTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreDTO {

    private Long storeId;
    private String storeName;
    private String storeImage;
    private String category;
    private List<StoreTag> tagList;
    private double minPrice;
    private double maxPrice;
    private String address;
    private double latitude; //위도
    private double longitude; //경도
    private String phone;
    private String openTime;
    private String closeTime;
    private String menuImage;
    private String updateDate;
    private double grade;
    private boolean isBookmark;
    Page<ReviewDTO> reviewList;

}
