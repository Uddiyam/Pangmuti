package com.kwic.kwcommunity.store.tag;

import com.kwic.kwcommunity.store.Store;
import com.kwic.kwcommunity.store.category.StoreCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "store_tag")
public class StoreTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeTagId;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

}
