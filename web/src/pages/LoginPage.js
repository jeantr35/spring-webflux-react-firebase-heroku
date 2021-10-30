import React, {useState} from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Link } from 'react-router-dom';
import {login} from "../actions/authActions"
import { useAuthState } from 'react-firebase-hooks/auth';


firebase.initializeApp({
    apiKey: "AIzaSyBSDlcJkzcY6ehtMZq0UvYCRYfJMjRaEFI",
    authDomain: "question-and-answer-19556.firebaseapp.com",
    projectId: "question-and-answer-19556",
    storageBucket: "question-and-answer-19556.appspot.com",
    messagingSenderId: "814060695759",
    appId: "1:814060695759:web:9fc7dcafb56b7824ae47ba",
    measurementId: "G-27X1YHQ7M3"
  });


const auth = firebase.auth();
const LoginPage = ({dispatch}) => {

    const [itFalied, setFailed] = useState(false);
    const [user, setUser] = useState({email:'', password:''});

    const handlerInput= (e)=> {
        setUser({...user,[e.target.name]: e.target.value})
    }

    const loginUser= async(e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(user.email,user.password);
        } catch (error) {
            setFailed(true);
        }
    }

    const [userRegister] = useAuthState(auth);

    if (userRegister){
        dispatch(login(userRegister.email,userRegister.password))}

    return (
        <>
            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Youremail@domain.com</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handlerInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Your secret password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handlerInput} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p></p>
            </form>
            {itFalied && <span> User or password incorrect</span>}
            {itFalied && <p>Recover your password <Link to="forgotPassword"> Here</Link></p>}
            <p>You don't have an account yet? <Link to="/register">Register</Link> </p>
            
        </>
    )

}

export default LoginPage;