import React from 'react';
import { useEffect } from 'react';
import { authResetState } from '../store/actions';
import { useDispatch} from 'react-redux';
import LoginForm from '../components/Login/LoginForm'
import { Link } from '@material-ui/core';


const Login = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState());
    }, [])



    return (
        <div className="login-container">
            <h1>Login</h1>

            <LoginForm />
            <Link href='forgot-password'>Olvidé mi contraseña</Link>

        </div >



    )
}


export default Login

