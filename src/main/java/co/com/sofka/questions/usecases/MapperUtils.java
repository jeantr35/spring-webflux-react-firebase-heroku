package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.collections.Vote;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.VoteDTO;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class MapperUtils {

    public Function<AnswerDTO, Answer> mapperToAnswer() {
        return updateAnswer -> {
            var answer = new Answer();
            answer.setPosition(updateAnswer.getPosition());
            answer.setQuestionId(updateAnswer.getQuestionId());
            answer.setUserId(updateAnswer.getUserId());
            answer.setAnswer(updateAnswer.getAnswer());
            answer.setEmail(updateAnswer.getEmail());
            answer.setUserPhotoUl(updateAnswer.getUserPhotoURL());
            answer.setPosition(updateAnswer.getPosition());
            return answer;
        };
    }

    public Function<QuestionDTO, Question> mapperToQuestion(String id) {
        return updateQuestion -> {
            var question = new Question();
            question.setId(id);
            question.setUserId(updateQuestion.getUserId());
            question.setCategory(updateQuestion.getCategory());
            question.setQuestion(updateQuestion.getQuestion());
            question.setUserId(updateQuestion.getUserId());
            question.setType(updateQuestion.getType());
            question.setEmail(updateQuestion.getEmail());
            question.setUserPhotoURL(updateQuestion.getUserPhotoURL());
            return question;
        };
    }

    public Function<Question, QuestionDTO> mapEntityToQuestion() {
        return entity -> new QuestionDTO(
                entity.getId(),
                entity.getUserId(),
                entity.getQuestion(),
                entity.getType(),
                entity.getCategory(),
                entity.getEmail(),
                entity.getUserPhotoURL()
        );
    }

    public Function<Answer, AnswerDTO> mapEntityToAnswer() {
        return entity -> new AnswerDTO(
                entity.getQuestionId(),
                entity.getUserId(),
                entity.getAnswer(),
                entity.getEmail(),
                entity.getId(),
                entity.getUserPhotoUl(),
                entity.getPosition()
        );
    }

    public Function<VoteDTO, Vote> mapperToVote(String id) {
        return updateVote -> {
            var vote = new Vote();
            vote.setId(id);
            vote.setUserId(updateVote.getUserId());
            vote.setAnswerId(updateVote.getAnswerId());
            vote.setQuestionId(updateVote.getQuestionId());
            vote.setVoteUp(updateVote.getVoteUp());
            return vote;
        };
    }

    public Function<Vote, VoteDTO> mapEntityToVote() {
        return entity -> new VoteDTO(
                entity.getId(),
                entity.getUserId(),
                entity.getAnswerId(),
                entity.getQuestionId(),
                entity.getVoteUp()
        );
    }

}
