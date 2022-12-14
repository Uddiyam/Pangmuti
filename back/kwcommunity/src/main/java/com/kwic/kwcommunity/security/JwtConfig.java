package com.kwic.kwcommunity.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Value("${springboot.jwt.secret}")
    private String secret;

    @Bean
    public TokenProvider jwtProvider() {
        return new TokenProvider(secret);
    }

}
