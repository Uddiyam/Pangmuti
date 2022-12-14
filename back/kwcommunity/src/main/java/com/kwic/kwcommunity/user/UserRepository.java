package com.kwic.kwcommunity.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUserId(String id);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByNickname(String name);

}
