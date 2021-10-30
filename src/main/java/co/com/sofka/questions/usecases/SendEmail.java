package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.model.QuestionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import reactor.core.publisher.Mono;

import javax.mail.MessagingException;

@Service
public class SendEmail{

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    //Pasamos por parametro: destinatario, asunto y el mensaje
    public Mono<Void> sendEmailTo(QuestionDTO question, Answer answer) throws MessagingException {
        var questionURL = "https://question-and-answer-19556.web.app/question/" + question.getId();
        Context context = new Context();
        context.setVariable("answer", answer);
        context.setVariable("question", question);
        context.setVariable("questionURL", questionURL);
        context.setVariable("userPhotoURL", answer.getUserPhotoUl());

        String process = templateEngine.process("emails/newAnswer", context);
        javax.mail.internet.MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject("You have a new answer to your Question: " + question.getQuestion());
        helper.setText(process, true);
        helper.setTo(question.getEmail());
        javaMailSender.send(mimeMessage);
        return Mono.empty();
    }

}
