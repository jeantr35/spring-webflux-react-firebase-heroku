import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../actions/questionActions'
import { connect } from 'react-redux'
import { Question } from '../components/Question'

const UpdateUserPage = ({ dispatch, loading, redirect, match,hasErrors, userId, email, name }) => {
    const { register, handleSubmit } = useForm();
    const { id } = match.params
    const history = useHistory();

    const onSubmit = data => {
        data.userId =  userId;
        data.email = email;
        data.photoURL = photoURL;
        dispatch(updateUser(data));
    };

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])



    return (
        <section>
            <h1>Update your name</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label for="answer">Answer</label>
                    <input id="name" {...register("name", { required: true, maxLength: 300 })} />
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>
    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    question: state.question.question,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid,
    email: state.auth.email,
    name: state.auth.name,
    photoURL: state.auth.photoURL
})

export default connect(mapStateToProps)(UpdateUserPage)