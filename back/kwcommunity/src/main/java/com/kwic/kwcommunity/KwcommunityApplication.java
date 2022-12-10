package com.kwic.kwcommunity;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.TimeZone;

@Slf4j
@SpringBootApplication
public class KwcommunityApplication {


	@PostConstruct
	public void started(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		log.info("현재 시작 :"+new Date());
	}

	public static void main(String[] args) {
		SpringApplication.run(KwcommunityApplication.class, args);
	}

}
