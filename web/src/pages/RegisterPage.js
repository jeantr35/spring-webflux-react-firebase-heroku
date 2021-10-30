import React, {useState} from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {login} from "../actions/authActions"
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const auth = firebase.auth();

const RegisterPage = ({dispatch}) => {

    const [user, setUser] = useState({email:'', password:''});
    const handlerInput= (e)=> {

        setUser({...user,[e.target.name]: e.target.value})
    }

    const registerUser= (e) => {
        e.preventDefault();
        return auth.createUserWithEmailAndPassword(user.email,user.password);
    }

    const [userRegister] = useAuthState(auth);

    if (userRegister){
        dispatch(login(userRegister.email,userRegister.password))}

    return (
        <>
            <form onSubmit={registerUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Youremail@domain.com</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handlerInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Your secret password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handlerInput} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <p></p>
            </form>
            <p>Go to <Link to="/login">Login</Link> </p>
        </>
    )


}
export default RegisterPage;