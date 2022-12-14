package com.kwic.kwcommunity.exception;

import com.kwic.kwcommunity.ApiStatus;
import com.kwic.kwcommunity.ResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandle {

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<ResponseDTO<Object>> handleException(Exception ex) {
        ResponseDTO<Object> res = ResponseDTO.builder()
                .status(ApiStatus.ERROR)
                .error(ex.getMessage())
                .build();
        return ResponseEntity.badRequest().body(res);

    }
}