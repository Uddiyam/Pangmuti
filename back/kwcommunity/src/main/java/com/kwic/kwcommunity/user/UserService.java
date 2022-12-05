package com.kwic.kwcommunity.user;

import com.kwic.kwcommunity.security.AuthToken;
import com.kwic.kwcommunity.security.TokenProvider;
import com.kwic.kwcommunity.user.dto.CreateUserDTO;
import com.kwic.kwcommunity.user.dto.LoginDTO;
import com.kwic.kwcommunity.user.dto.UserInfoDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public boolean checkNickname(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }
    @Transactional
    public User createUser(CreateUserDTO dto) {
        String hashPassword = passwordEncoder.encode(dto.getPassword());
        User user = User.builder()
                .userId(User.createUserId())
                .email(dto.getEmail())
                .password(hashPassword)
                .nickname(dto.getNickname())
                .roleType(RoleType.USER)
                .build();
        return userRepository.save(user);
    }

    @Transactional
    public UserInfoDTO login(LoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail()).orElseThrow(()->new IllegalArgumentException("존재하지 않는 회원입니다"));
        if(passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return UserInfoDTO.builder()
                    .email(user.getEmail())
                    .nickname(user.getNickname())
                    .token(makeNewAllToken(user))
                    .build();
        }
        else {
            throw new IllegalArgumentException("존재하지 않는 회원입니다(비번)");
        }
    }

    private String makeNewAllToken(User user){
        AuthToken accessToken = makeAccessToken(user);
        return accessToken.getToken();
    }

    private AuthToken makeAccessToken(User user) {
        return tokenProvider.createAccessToken(user.getUserId(),user.getRoleType().getName());
    }

}
