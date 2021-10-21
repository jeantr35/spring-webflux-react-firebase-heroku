package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.function.Function;

@Service
public class FilterQuestionsByCriteriaUseCase implements Function<String, Flux<QuestionDTO>> {

    private final QuestionRepository questionRepository;
    private final MapperUtils mapperUtils;

    public FilterQuestionsByCriteriaUseCase(MapperUtils mapperUtils, QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Flux<QuestionDTO> apply(String category) {
        return questionRepository.findAll().filter(question -> {
                    if (question.getQuestion().contains(category))
                        return true;
                    return false;
                })
                .map(mapperUtils.mapEntityToQuestion());
    }
}
