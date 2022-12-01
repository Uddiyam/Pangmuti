package com.kwic.kwcommunity.user;

import com.kwic.kwcommunity.user.dto.UserDTO;
import com.kwic.kwcommunity.user.mail.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO);
        return ResponseEntity.ok().body(user);
    }

}
