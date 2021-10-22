package co.com.sofka.questions.usecases;

import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DeleteUseCaseTest {
    @SpyBean
    private DeleteAnswerUseCase deleteAnswerUseCase;

    @MockBean
    private AnswerRepository answerRepository;

    @Test
    @DisplayName("delete question")
    void deleteAnswerTest(){
        Mockito.when( answerRepository.deleteById("XXXXXX")).thenReturn(Mono.empty());

        var result = deleteAnswerUseCase.apply("XXXXXX").block();
        assertNull(result);
    }
}