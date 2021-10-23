package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class OwnerListUseCaseTest {
    QuestionRepository repository;
    OwnerListUseCase ownerListUseCase;


    @BeforeEach
    public void setup(){
        MapperUtils mapperUtils = new MapperUtils();
        repository = mock(QuestionRepository.class);
        ownerListUseCase = new OwnerListUseCase(mapperUtils, repository);
    }

    @Test
    @DisplayName("getQuestion by owner id")
    void getQuestionOwnerSuccessTest() {
        var question = new Question();
        question.setId("XXXXX");
        question.setUserId("xxxxxxxx");
        question.setType("open");
        question.setCategory("software");
        question.setQuestion("test");

        when(repository.findByUserId(question.getUserId())).thenReturn(Flux.just(question));

        StepVerifier.create(ownerListUseCase.apply(question.getUserId()))
                .expectNextMatches(questionDTO -> {
                    assert questionDTO.getId().equals("XXXXX");
                    assert questionDTO.getUserId().equals("xxxxxxxx");
                    assert questionDTO.getType().equals("open");
                    assert questionDTO.getCategory().equals("software");
                    assert questionDTO.getQuestion().equals("test");
                    return true;
                })
                .verifyComplete();

        verify(repository).findByUserId(question.getUserId());
    }
}
