import React from 'react';
import { useEffect } from 'react';
import { authResetState } from '../store/actions';
import { useDispatch } from 'react-redux';
import LoginForm from '../components/Auth/LoginForm'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const Login = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState());
    }, [])



    return (
        <div className="auth-container">
            <section className="auth-content">

                <Typography color="primary" variant="h1">

                    Login

                </Typography>
                <LoginForm />
            </section>
            <section className="auth-info">
                <article>
                    <p className="over-title">Welcome to</p>
                    <h1 className="title">WALLACLONE</h1>
                    <p className="subtitle">The best website for<br></br>second hand buying and selling</p>
                </article>
                <article className="team">
                    <p><span>BY</span> JS BANDITS</p>
                </article>
            </section>
        </div >



    )
}


export default Login

