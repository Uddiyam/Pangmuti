package com.kwic.kwcommunity.user.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

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
    private String code;

    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);
        message.setSubject("[팡뮤티] 이메일 계정 확인");

        String msg = "";
        msg += "<h2>안녕하세요. [팡뮤티]입니다!</h2>";
        msg += "<p>아래 인증번호를 인증번호 입력칸에 적어주세요.</p>";
        msg += "<br />";
        msg += "<div style='border: 1px solid; padding-bottom: 10px; text-align:center'><h3>인증번호</h3>";
        msg += "<p><strong>";
        msg += code+"</strong></p></div>";
        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress("kwicproject@naver.com","admin"));

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    public String sendMail(String to)throws Exception {
        code = createKey();
        MimeMessage message = createMessage(to);
        try{
            mailSender.send(message); // 메일 발송
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return code; // 메일로 보냈던 인증 코드를 서버로 리턴
    }
}
