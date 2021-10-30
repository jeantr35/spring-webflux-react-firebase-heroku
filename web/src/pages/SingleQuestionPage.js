import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteAnswer, redirectToNewQuestion, redirectToUpdateQuestion } from '../actions/questionActions'
import { fetchQuestion } from '../actions/questionActions'
import swal from 'sweetalert';
import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link, useHistory} from 'react-router-dom'

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  userId,
  redirect
}) => {

  const history = useHistory();

  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id, redirect])

  useEffect(() => {
    if (redirect) {
        history.push(redirect);
    }
}, [redirect, history])

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} onEdit={onEdit} userId={userId} />
  }

  const onDeleteAnswer = (answer) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this answer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAnswer(answer))
        swal("Poof! Your answer has been deleted!", {
          icon: "success",
        });
      }
    });
    
}

const onEdit = (question) => {

  (question.answers && question.answers.length) ? swal({
    title: "Readme please",
    text: "A new question will be created because this question have an asnwer",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(redirectToNewQuestion());
    }
  })
   : dispatch(redirectToUpdateQuestion(question.id));
}

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} onDelete={onDeleteAnswer} userId={userId}/>
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      <hr/>
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}
      
      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid,
  redirect: state.question.redirect
})

export default connect(mapStateToProps)(SingleQuestionPage)
