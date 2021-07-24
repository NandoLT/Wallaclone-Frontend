import React from 'react';
import { useEffect } from 'react';
import { authResetState } from '../store/actions';
import { useDispatch} from 'react-redux';
import LoginForm from '../components/Login/LoginForm'


const Login = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState());
    }, [])



    return (
        <div className="login-container">
            <h1>Login</h1>

            <LoginForm />

        </div >



    )
}


export default Login

