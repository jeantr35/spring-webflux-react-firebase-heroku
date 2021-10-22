package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.reposioties.UserRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class CreateUserUseCase implements SaveUser {
    private final UserRepository userRepository;
    private final MapperUtils mapperUtils;

    public CreateUserUseCase(MapperUtils mapperUtils, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<UserDTO> apply(UserDTO newUser) {
            return userRepository.findById(newUser.getId())
                    .map(mapperUtils.mapEntityToUser())
                    .switchIfEmpty(userRepository.save(mapperUtils.mapperToUser(newUser.getId()).apply(newUser)).map(mapperUtils.mapEntityToUser()));
    }

}
