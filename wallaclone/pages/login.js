import React from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getIsLogged } from '../store/selectors';
import { authLogin, authLoginAction, authLogout } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';




const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));



// const handleSubmit = (remember, credentials) =>{
//     dispatch(authLogin(credentials))

// }


const Login = () => {

    const dispatch = useDispatch();
    const classes = useStyles();


    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })
    const [remember, setRemember] = React.useState(false);

    const { email, password } = credentials;

    const handleSubmit = (event) => {
        console.log(remember, credentials)
        event.preventDefault();
        dispatch(authLoginAction(remember, credentials))

    }


    const handleInputChange = event => {
        setCredentials(oldCredentials => {

            const newCredentials = {
                ...oldCredentials,
                [event.target.name]: event.target.value,
            }
            return newCredentials
        });

    }

    const handleCheckBoxChange = event => {
        setRemember(!remember);
    }

    return (
        <div className="login-container">
            <h1>Login</h1>



            {/* <form className="loginForm" onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <input
                        name="email"
                        value={email}
                        placeholder="email"
                        onChange={handleInputChange} />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="password"
                        className='loginForm-field'
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />

                </div>

                <input
                    type="checkbox"
                    name="remember"
                    placeholder="remember"
                    checked={remember}
                    onChange={handleCheckBoxChange}
                />
                <button >Login</button>
            </form> */}



            <form onSubmit={handleSubmit} className="login-form">
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField onChange={event => handleInputChange(event)} name="email" id="input-with-icon-grid" label="Username" />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField onChange={handleInputChange} name="password" id="input-with-icon-grid" label="Password" type="password" />
                        </Grid>
                    </Grid>
                </div>
                <div className="remember-check">
                    <label htmlFor="remember">Remember</label>
                    <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={remember}
                        onChange={handleCheckBoxChange}
                    />
                </div>



                <Button size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Login
                </Button>
            </form>

            <Link href='/'>
                Go back home
            </Link >
        </div>

    )
}
// const mapStateToProps = (state) => ({ isLogged: getIsLogged(state) }); // Para poder conectar el componente al estado de redux

// const mapDispatchToProps = (dispatch) => ({
//     onLogin: () => dispatch(authLoginAction()),
//     onLogout: () => dispatch(authLogout())
// }); //Para poder conectar el componente al dispatch de redux

//export default connect(mapStateToProps, mapDispatchToProps)(Login)
export default Login;
