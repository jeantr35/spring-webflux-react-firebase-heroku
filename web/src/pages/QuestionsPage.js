import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {CategoryFilter} from '../components/CategoryFilter' 
import { fetchQuestions, fetchCategoryQuestions} from '../actions/questionActions'
import { Question } from '../components/Question'
import { Switch, Route, Redirect } from 'react-router';

const QuestionsPage = ({ dispatch, loading, questions, hasErrors, match, redirect}) => {
    const { name } = match.params

    useEffect(() => {
        if(name === undefined){
            dispatch(fetchQuestions())
             console.log("normal");
        }
        if(name !== undefined){
            dispatch(fetchCategoryQuestions(name))
            console.log(name);
        }
    }, [dispatch, redirect, name])

    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <CategoryFilter/>
            <h1>Questions</h1>

            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
    redirect: state.question.redirect,
})

export default connect(mapStateToProps)(QuestionsPage)
