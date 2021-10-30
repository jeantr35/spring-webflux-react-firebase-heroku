package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UpdateQuestionUseCase implements SaveQuestion{

    private final QuestionRepository questionRepository;
    private final MapperUtils mapperUtils;

    public UpdateQuestionUseCase(MapperUtils mapperUtils, QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<String> apply(QuestionDTO questionDTO) {
        return questionRepository
                .save(mapperUtils.mapperToQuestion(questionDTO.getId()).apply(questionDTO))
                .map(Question::getId);
    }
}
