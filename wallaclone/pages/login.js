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


const [credentials, setCredentials] = React.useState({
    email:'',
    password:''
})

const handleInputChange = event =>{
    setCredentials(oldCredentials => {

        const newCredentials = {
            ...oldCredentials,
            [event.target.name]: event.target.value,
        }
       return newCredentials
    });
    
}



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));



// const handleSubmit = (remember, credentials) =>{
//     dispatch(authLogin(credentials))

// }

const handleSubmit = () =>{
    console.log('Has hecho submit en el formulario')
}

const Login = () => {
    const classes = useStyles();
    return (
        <div className="login-container">
            <h1>Login</h1>

            <FormControl onSubmit={handleSubmit}>
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField onChange ={handleInputChange} name="email" id="input-with-icon-grid" label="Username" />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField onChange ={handleInputChange} name="password" id="input-with-icon-grid" label="Password" type="password" />
                        </Grid>
                    </Grid>
                </div>

                <Button size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Login
                </Button>
            </FormControl>

            <Link href='/'>
                Go back home
            </Link >
        </div>

    )
}

export default Login
