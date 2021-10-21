import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CategoryFilter from '../components/CategoryFilter'
import { fetchQuestions, fetchOwnerQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    const filterTest = () => {
        console.log("Hello")
    }

    return (
        <section>
            <h1>Questions</h1>
            <CategoryFilter dispatch={dispatch} renderQuestions={filterTest}/>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)
