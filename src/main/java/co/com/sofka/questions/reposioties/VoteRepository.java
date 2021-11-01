package co.com.sofka.questions.reposioties;

import co.com.sofka.questions.collections.Vote;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface VoteRepository extends ReactiveCrudRepository<Vote, String> {
    Mono<Vote> findByQuestionIdAndUserId(String questionId, String userId);
    Flux<Vote> findByQuestionId(String questionId);
}
