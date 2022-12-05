package com.kwic.kwcommunity.user;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class UserId implements Serializable {

    private String userId;

    public static UserId createUserId(){return new UserId(NanoIdUtils.randomNanoId());}
}
