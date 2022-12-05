package com.kwic.kwcommunity.post.comment;

import com.kwic.kwcommunity.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    private Long userId;
    private String contents;

    @CreatedDate
    private String date;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

}
