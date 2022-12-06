package com.kwic.kwcommunity.user;

import com.kwic.kwcommunity.ApiStatus;
import com.kwic.kwcommunity.ResponseDTO;
import com.kwic.kwcommunity.user.dto.*;
import com.kwic.kwcommunity.user.mail.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    @PostMapping("/mail")
    public ResponseEntity<?> sendMail(@RequestBody EmailDTO dto) {
        try {
            String code = mailService.sendMail(dto.getEmail());
            return ResponseEntity.ok().body(code);
        } catch (Exception e) {
            ResponseDTO<Object> res = ResponseDTO.builder()
                    .status(ApiStatus.ERROR)
                    .error(e.getMessage())
                    .build();
            return ResponseEntity.ok().body(res);
        }
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkName(@RequestBody NicknameDTO dto) {
        boolean check = userService.checkNickname(dto.getNickname());
        return ResponseEntity.ok().body(check);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody CreateUserDTO userDTO){
        User user = userService.createUser(userDTO);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        homeDTO user = userService.login(loginDTO);
        return ResponseEntity.ok().body(user);
    }

}
