package com.kwic.kwcommunity.user.mail;

import com.kwic.kwcommunity.user.UserRepository;
import com.kwic.kwcommunity.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private String code;

    @Transactional
    public MimeMessage createMessage(String email) throws Exception{
        if(userRepository.existsByEmail(email)) {
            throw new Exception("이미 가입한 이메일입니다");
        }

        MimeMessage message = mailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject("[팡뮤티] 이메일 계정 확인");

        String msg = "";
        msg += "<h2>안녕하세요. [팡뮤티]입니다!</h2>";
        msg += "<p>아래 인증번호를 인증번호 입력칸에 적어주세요.</p>";
        msg += "<br />";
        msg += "<div style='border: 1px solid; padding-bottom: 10px; text-align:center'><h3>인증번호</h3>";
        msg += "<p><strong>";
        msg += code+"</strong></p></div>";
        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress("kwicproject@naver.com","팡뮤티관리자"));

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) {
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    public String sendMail(String to)throws Exception {
        code = createKey();
        MimeMessage message = createMessage(to);
        try{
            mailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return code;
    }
}
