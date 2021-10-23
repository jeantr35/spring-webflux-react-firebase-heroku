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

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
class FilterQuestionsByCategoryUseCaseTest {

    QuestionRepository repository;
    FilterQuestionsByCategoryUseCase filterQuestionsByCategoryUseCase;

    @BeforeEach
    public void setup() {
        MapperUtils mapperUtils = new MapperUtils();
        repository = mock(QuestionRepository.class);
        filterQuestionsByCategoryUseCase = new FilterQuestionsByCategoryUseCase(mapperUtils,repository);
    }

    @Test
    @DisplayName("FilterByCategory")
    void getAllByCategoryTest() {
        var question = new Question();
        question.setId("XXXXX");
        question.setUserId("xxxxxxxx");
        question.setType("open");
        question.setCategory("software");
        question.setQuestion("test");

        when(repository.findByCategory(question.getCategory())).thenReturn(Flux.just(question));

        StepVerifier.create(filterQuestionsByCategoryUseCase.apply(question.getCategory())).expectNextMatches(
                questionDTO -> {
                    assert questionDTO.getId().equals("XXXXX");
                    assert questionDTO.getUserId().equals("xxxxxxxx");
                    assert questionDTO.getType().equals("open");
                    assert questionDTO.getCategory().equals("software");
                    assert questionDTO.getQuestion().equals("test");
                    return true;}
        ).verifyComplete();

        verify(repository).findByCategory(question.getCategory());
    }

}