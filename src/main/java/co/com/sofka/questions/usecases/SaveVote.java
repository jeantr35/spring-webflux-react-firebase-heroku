package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.VoteDTO;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@FunctionalInterface
public interface SaveVote {
    Mono<String> apply(@Valid VoteDTO voteDTO);
}
