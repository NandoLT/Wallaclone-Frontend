
import React, { useEffect } from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { authRegisterAction, authResetState } from '../store/actions';
import { useDispatch, connect } from 'react-redux';
import Loading from '../components/Loading';
import { getIsLogged, getIsLoading, getError } from '../store/selectors';
import Alert from '../components/Alert';
import styles from '../styles/Home.module.css'
import RegisterForm from '../components/Auth/RegisterForm'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));



const Register = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState());
    }, []);



    return (
        <div className="auth-container">
            <section className="auth-content">

                <Typography color="primary" variant="h1">

                    Register

                </Typography>
                <RegisterForm />
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



const mapStateToProps = (state) => ({
    isLogged: getIsLogged(state),
    isLoading: getIsLoading(state),
    error: getError(state),
}); // Para poder conectar el componente al estado de redux

// const mapDispatchToProps = (dispatch) => ({
//     onLogin: () => dispatch(authLoginAction()),
//     onLogout: () => dispatch(authLogout())
// }); //Para poder conectar el componente al dispatch de redux

export default connect(mapStateToProps)(Register)
