import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {fetchQuestion, updateQuestion } from '../actions/questionActions'
import { connect } from 'react-redux'

const UpdateQuestion = ({ dispatch, match, loading, redirect, userId, email, photoURL, question}) => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const INITIAL_VALUE = question.question;

    const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id));
  }, [dispatch, id, redirect])

    const onSubmit = data => {
        data.id = question.id
        data.userId = userId;
        data.email = email;
        data.userPhotoURL = photoURL;
        dispatch(updateQuestion(data));
    };

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    return (
        <section>
            <h1>Update your question</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="type">Type</label>
                    <select {...register("type")} id="">
                        <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select {...register("category")} id="category">
                        <option value="TECHNOLOGY-AND-COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE-DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL-SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>

                    </select>
                </div>

                <div>
                    <label htmlFor="question">Question</label>
                    <textarea id="question" {...register("question", { required: true, maxLength: 300 })} placeholder={INITIAL_VALUE}/>
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    question: state.question.question,
    loading: state.question.loading,
    redirect: state.question.redirect,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid,
    photoURL: state.auth.photoURL,
    email: state.auth.email
})

export default connect(mapStateToProps)(UpdateQuestion)