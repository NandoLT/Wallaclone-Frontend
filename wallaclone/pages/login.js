import React, { useEffect } from 'react';
import { authResetState } from '../store/actions';
import { connect, useDispatch } from 'react-redux';
import LoginForm from '../components/Auth/LoginForm'
import { makeStyles, Typography } from '@material-ui/core';
import { getIsLogged } from '../store/selectors';
import { useRouter } from 'next/dist/client/router';
import { CardMedia } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    logo: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 50,
        cursor: 'pointer'
    }
}))


const Login = ({ isLogged }) => {

    const classes = useStyles();

    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState());
    }, [])

    if (isLogged) {
        router.push('/adverts?limit=8&skip=0');
        return null;
    }

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




const mapStateToProps = state => ({
    isLogged: getIsLogged(state),

})



export default connect(mapStateToProps)(Login)

