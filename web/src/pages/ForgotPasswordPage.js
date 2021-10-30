import React, {useState} from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Link } from 'react-router-dom';

const auth = firebase.auth();

const ForgotPasswordPage = ({dispatch}) => {

    const [user, setUser] = useState({email:''});

    const handlerInput= (e)=> {
        setUser({...user,[e.target.name]: e.target.value})
    }

    const sendPassword= (e) => {
        e.preventDefault();
        return auth.sendPasswordResetEmail(user.email);
    }

    return (
        <>
            <form onSubmit={sendPassword}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Your email to recover password</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handlerInput} />
                </div>
                <button type="submit" className="btn btn-primary">Recover</button>
                <p></p>
            </form>
            <p>Go to <Link to="/login">Login</Link> </p>
        </>
    )


}
export default ForgotPasswordPage;