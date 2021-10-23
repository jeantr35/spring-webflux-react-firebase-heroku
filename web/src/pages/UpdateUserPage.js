import React,  { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from '../actions/questionActions'
import { connect } from 'react-redux'

const UpdateUserPage = ({ dispatch, loading, match, userId, email, name, photoURL, auth }) => {
    const { register, handleSubmit } = useForm();
    const [newname, setNewName] = useState(name)

    const onSubmit = data => {
        data.userId =  userId;
        data.email = email;
        data.photoURL = photoURL;
        console.log(data.name)
        dispatch(updateUser(data.name, auth));
        console.log(data.name)
    };

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    return (
        <section>
            <h1>Update your name</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="answer">Name</label>
                    <input id="name" {...register("name", { required: true, maxLength: 300 })} onChange={handleChange} value={newname}/>
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
    photoURL: state.auth.photoURL,
    auth: state.auth
})

export default connect(mapStateToProps)(UpdateUserPage)