package co.com.sofka.questions.model;

import java.util.ArrayList;
import java.util.Optional;

public class VoteDTO {

    private String id;
    private String userId;
    private String answerId;
    private String questionId;
    private Boolean voteUp;

    public VoteDTO(String id, String userId, String answerId, String questionId, Boolean voteUp) {
        this.id = id;
        this.userId = userId;
        this.answerId = answerId;
        this.questionId = questionId;
        this.voteUp = voteUp;
    }

    public Boolean getVoteUp() {
        return voteUp;
    }

    public void setVoteUp(Boolean voteUp) {
        this.voteUp = voteUp;
    }

    public String getId() {
        this.id = Optional.ofNullable(id).orElse(null);
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAnswerId() {
        return answerId;
    }

    public void setAnswerId(String answerId) {
        this.answerId = answerId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }
}
