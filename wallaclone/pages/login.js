import React from 'react';
import { useEffect } from 'react';
import { authLoginAction, authResetState } from '../store/actions';
import { useDispatch} from 'react-redux';
import LoginForm from '../components/Login/LoginForm'


const Login = () => {


    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(authResetState());
    }, [])

    const handleSubmit = (event) => {
        
        event.preventDefault();
        dispatch(authLoginAction(remember, credentials))

    }


    return (
        <div className="login-container">
            <h1>Login</h1>

            <LoginForm handleSubmit={handleSubmit}/>

        </div >



    )
}


export default Login

