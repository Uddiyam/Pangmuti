package com.kwic.kwcommunity.store;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {
    //TODO 음식점 리스트 출력(페이징 및 정렬)
    //TODO 음식점 상세 정보 출력
}
