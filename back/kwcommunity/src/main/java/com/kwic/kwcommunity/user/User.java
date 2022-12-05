package com.kwic.kwcommunity.user;


import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {

    @Id
    private String userId;

    @Email
    @Column(nullable = false, unique = true)
    private String email;
    @NotBlank
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password; //임시

    @NotBlank
    @Size(min = 2, max = 8)
    @Column(unique = true)
    private String nickname;

    @Column(nullable = false)
    private RoleType roleType;

    public static String createUserId(){return NanoIdUtils.randomNanoId();}

}
