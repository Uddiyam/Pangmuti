package com.kwic.kwcommunity.store.review;

import com.kwic.kwcommunity.store.Store;
import com.kwic.kwcommunity.store.tag.Tag;
import com.kwic.kwcommunity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    private String contents;
    private int grade;
    private String date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public boolean checkMyReview(String userId) {
        return Objects.equals(userId, this.user.getUserId());
    }

}
