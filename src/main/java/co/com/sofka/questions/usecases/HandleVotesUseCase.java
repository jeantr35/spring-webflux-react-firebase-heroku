package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Vote;
import co.com.sofka.questions.model.VoteDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.VoteRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.function.Function;

@Service
public class HandleVotesUseCase implements Function<VoteDTO, Mono<String>> {

    private final AnswerRepository answerRepository;
    private final VoteRepository voteRepository;
    private final MapperUtils mapperUtils;
    private final CreateVoteUseCase createVoteUseCase;

    public HandleVotesUseCase(AnswerRepository answerRepository, VoteRepository voteRepository, MapperUtils mapperUtils, CreateVoteUseCase createVoteUseCase) {
        this.answerRepository = answerRepository;
        this.voteRepository = voteRepository;
        this.mapperUtils = mapperUtils;
        this.createVoteUseCase = createVoteUseCase;
    }

    private Mono<Answer> updateAnswer(String answerId, Boolean voteUp){
        return answerRepository.findById(answerId).flatMap(
                answer -> {
                    if (voteUp){
                        answer.setPosition(answer.getPosition() + 1);
                        System.out.println(answer.getPosition() + " sumado");
                        return answerRepository.save(answer).thenReturn(answer);
                    }
                    answer.setPosition(answer.getPosition() - 1);
                    System.out.println(answer.getPosition() + " restado");
                    return answerRepository.save(answer).thenReturn(answer);
                }
        );
    }

    @Override
    public Mono<String> apply(VoteDTO voteDTO) {
        return voteRepository.findByQuestionIdAndUserId(voteDTO.getQuestionId(), voteDTO.getUserId()).flatMap(
            vote -> updateAnswer(vote.getAnswerId(), !vote.getVoteUp()).then(updateAnswer(voteDTO.getAnswerId(), voteDTO.getVoteUp()))
                        .then(createVoteUseCase.apply(voteDTO)).thenReturn(vote.getId())
        ).switchIfEmpty(updateAnswer(voteDTO.getAnswerId(), voteDTO.getVoteUp()).then(createVoteUseCase.apply(voteDTO)));
    }

}
