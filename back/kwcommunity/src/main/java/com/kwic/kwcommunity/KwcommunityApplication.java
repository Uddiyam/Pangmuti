package com.kwic.kwcommunity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class KwcommunityApplication {

	public static void main(String[] args) {
		SpringApplication.run(KwcommunityApplication.class, args);
	}

}
