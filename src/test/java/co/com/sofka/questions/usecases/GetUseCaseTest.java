package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
class GetUseCaseTest {
    GetUseCase getUseCase;
    QuestionRepository questionRepository;
    AnswerRepository answerRepository;
    MapperUtils mapperUtils;
    @BeforeEach
    public void setup(){
        mapperUtils = new MapperUtils();
        questionRepository = mock(QuestionRepository.class);
        answerRepository = mock(AnswerRepository.class);
        getUseCase = new GetUseCase(mapperUtils,questionRepository,answerRepository);
    }
    @Test
    @DisplayName("get Question and it answers")
    void getQuestionSuccessTest() {
        var question = new Question();
        question.setId("XXXXX");
        question.setUserId("xxxxxxxx");
        question.setType("open");
        question.setCategory("software");
        question.setQuestion("test");

        var answer = new Answer();
        answer.setId("AAAAAA");
        answer.setUserId("xxxx-xxxx");
        answer.setQuestionId("XXXXX");
        answer.setPosition(1);
        answer.setAnswer("answer test");

        when(questionRepository.findById(question.getId())).thenReturn(Mono.just(question));
        when(answerRepository.findAllByQuestionId(question.getId())).thenReturn(Flux.just(answer));

        StepVerifier.create(getUseCase.apply(question.getId())).expectNextMatches(
                questionDTO1 -> {
                    assert questionDTO1.getId().equals("XXXXX");
                    assert questionDTO1.getUserId().equals("xxxxxxxx");
                    assert questionDTO1.getType().equals("open");
                    assert questionDTO1.getCategory().equals("software");
                    assert questionDTO1.getQuestion().equals("test");
                    return true;
                }
        ).verifyComplete();

        verify(questionRepository).findById(question.getId());
        verify(answerRepository).findAllByQuestionId(question.getId());
    }
}