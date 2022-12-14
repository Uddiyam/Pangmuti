package com.kwic.kwcommunity.post;

import com.kwic.kwcommunity.post.category.PostCategory;
import com.kwic.kwcommunity.post.comment.Comment;
import com.kwic.kwcommunity.user.User;
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
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String contents;
    private String date;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
    private List<Comment> commentList;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private PostCategory postCategory;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
