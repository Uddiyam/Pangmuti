package com.kwic.kwcommunity.security;

public class TokenValidFailedException extends RuntimeException{
    public TokenValidFailedException() {
        super("Failed to generate Token.");
    }
}