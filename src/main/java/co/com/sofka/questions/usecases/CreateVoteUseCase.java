package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Vote;
import co.com.sofka.questions.model.VoteDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.VoteRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CreateVoteUseCase implements SaveVote {

    private final VoteRepository voteRepository;
    private final MapperUtils mapperUtils;

    public CreateVoteUseCase(VoteRepository voteRepository, MapperUtils mapperUtils) {
        this.voteRepository = voteRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<String> apply(VoteDTO voteDTO) {
        return voteRepository.save(mapperUtils.mapperToVote(voteDTO.getQuestionId()+voteDTO.getUserId()).apply(voteDTO)).map(Vote::getId);
    }
}
