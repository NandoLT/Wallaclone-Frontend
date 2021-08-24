import React from 'react';
import { useEffect } from 'react';
import { authResetState } from '../store/actions';
import { useDispatch} from 'react-redux';
import LoginForm from '../components/Login/LoginForm'
import { Link } from '@material-ui/core';
import WithAuth from '../components/hocs/WithAuth';
import { Router } from 'next/router';
import { connect } from 'react-redux';
import { getIsLogged } from '../store/selectors';
import router from 'next/router';


const Login = ({isLogged}) => {

   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState());
    }, [])

    if(isLogged){
        router.push('/adverts');
        return null;
    }

    return (
        <div className="login-container">
            <h1>Login</h1>

            <LoginForm />
            <Link href='forgot-password'>Olvidé mi contraseña</Link>

        </div >



    )
}




const mapStateToProps = state => ({
    isLogged: getIsLogged(state),
    
})



export default connect(mapStateToProps)(Login)

