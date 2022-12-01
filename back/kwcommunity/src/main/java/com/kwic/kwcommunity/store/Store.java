package com.kwic.kwcommunity.store;

import com.kwic.kwcommunity.post.category.PostCategory;
import com.kwic.kwcommunity.post.comment.Comment;
import com.kwic.kwcommunity.store.category.StoreCategory;
import com.kwic.kwcommunity.store.review.Review;
import com.kwic.kwcommunity.store.tag.StoreTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "store")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;
    private String storeName;
    private String storeImage;
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

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Review> reviewList;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    private List<StoreTag> storeTag;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private StoreCategory storeCategory;

}
