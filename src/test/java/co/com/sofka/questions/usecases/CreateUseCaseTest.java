package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CreateUseCaseTest {

    @SpyBean
    CreateUseCase createUseCase;

    @MockBean
    QuestionRepository questionRepository;


    @Test
    @DisplayName("Create question")
    void createQuestionTest() {

        var questionDTO = new QuestionDTO("XXXXX", "userid", "test", "open", "test", "aaaa@gmail.com", "aaa");
        var question = new Question();
        question.setId("XXXXX");

        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        StepVerifier.create(createUseCase.apply(questionDTO)).expectNextMatches(
                id -> {
                    assert id.equals(questionDTO.getId());
                    return true;
                }).verifyComplete();

    }
}