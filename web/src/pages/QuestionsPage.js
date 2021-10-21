import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import CategoryFilter from '../components/CategoryFilter'
import { fetchQuestions, fetchCategoryQuestions, fetchQuestionsByCriteria } from '../actions/questionActions'
import { Question } from '../components/Question'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const { register, handleSubmit } = useForm();

    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    const onSubmit = data => {
        if(data.question === null || data.question === ""){
            dispatch(fetchCategoryQuestions(data.type));
        }
        if (data.type === "none" && data.question !== null && data.question !== "") {
            dispatch(fetchQuestionsByCriteria(data.question));
        }
        if (data.type === "none" && data.question === "") {
            dispatch(fetchQuestions());
        }
        if (data.type !== "none" && data.question !== "") {
            dispatch(fetchQuestions());
        }
        renderQuestions();
    };

    return (
        <section>
            <h1>Questions</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
            <div id="CategoryFilter">
                <label for="type">Type filter</label>
                <select {...register("type")} id="">
                        <option value="none">NONE</option>
                        <option value="TECHNOLOGY-AND-COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE-DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL-SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>
                </select>
                <label for="question">Question</label>
                <textarea id="question" {...register("question", { required: false, maxLength: 300, minLength: 3})} />
                <button type="submit" className="button">Filter</button>
            </div>
            </form>

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
