package com.kwic.kwcommunity.user;

import com.kwic.kwcommunity.user.dto.CreateUserDTO;
import com.kwic.kwcommunity.user.dto.LoginDTO;
import com.kwic.kwcommunity.user.dto.homeDTO;
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
    public ResponseEntity<?> sendMail(@RequestBody String email) throws Exception {
        String code = mailService.sendMail(email);
        return ResponseEntity.ok().body(code);
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkName(@RequestBody String name) {
        boolean check = userService.checkNickname(name);
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
