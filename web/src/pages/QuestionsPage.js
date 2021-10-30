import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {CategoryFilter} from '../components/CategoryFilter' 
import { fetchQuestions, fetchCategoryQuestions} from '../actions/questionActions'
import { Question } from '../components/Question'
import Autoomplete from '../components/Autocomplete';


const INITIAL_PAGE = 0;
const QuestionsPage = ({ dispatch, loading, questions, hasErrors, match, redirect}) => {
    const { name } = match.params
    const [nextPage, setNextPage] = useState(1);
    const [page, setPage] = useState(INITIAL_PAGE);

    useEffect(() => {
        if(name === undefined){
            dispatch(fetchQuestions())
        }
        if(name !== undefined){
            dispatch(fetchCategoryQuestions(name))
        }
    }, [dispatch, redirect, name, page])

    const handlePage = (v) => {
        setPage(v)
        setNextPage(v+1)
    }


    const filteredQuestions = () => {
        return questions.filter( (q,i) => (i >= page*10) && (i < nextPage*10))
    }


    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>
        return filteredQuestions().map(question => <Question key={question.id} question={question} excerpt />)
    }

    const pages = () => {
        const total = Math.ceil(questions.length / 10)
        return [...Array((total)).keys()]
    }

    const renderNavQuestionPage = () => {
        return pages().map(v => <button key={v} onClick={() => handlePage(v)}>{v+1}</button>)
    }

    return (
        <section>
            <CategoryFilter/>
            <Autoomplete questions={questions}/>
            <h1>Questions</h1>
            {renderQuestions()}
            {renderNavQuestionPage()}
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
