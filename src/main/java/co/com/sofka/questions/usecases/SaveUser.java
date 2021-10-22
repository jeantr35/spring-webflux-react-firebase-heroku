package co.com.sofka.questions.usecases;
import co.com.sofka.questions.model.UserDTO;
import reactor.core.publisher.Mono;

@FunctionalInterface
public interface SaveUser {
    Mono<UserDTO> apply( UserDTO userDTO);
}
