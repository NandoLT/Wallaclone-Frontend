
import React, { useEffect } from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { authResetState } from '../store/actions';
import { useDispatch, connect } from 'react-redux';
import { getIsLogged, getIsLoading, getError } from '../store/selectors';
import RegisterForm from '../components/Auth/RegisterForm'
import { Typography } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    logo: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 50,
        cursor: 'pointer'
    }
}));



const Register = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState());
    }, []);



    return (
        <div className="auth-container">
            <Link href="/">
                <CardMedia
                    component="img"
                    alt="Logo"
                    image="/img/bolso.svg"
                    title="Logo"
                    className={classes.logo}
                />
            </Link>
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
