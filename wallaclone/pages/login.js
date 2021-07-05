import React from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const Login = () => {
    const classes = useStyles();
    return (
        <div className="login-container">
            <h1>Login</h1>

            <FormControl>
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Username" />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Password" type="password" />
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
