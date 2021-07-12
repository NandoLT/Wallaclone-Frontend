
import React from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { authRegisterAction } from '../store/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));



const Register = () => {

    const dispatch = useDispatch();
    const classes = useStyles();


    const [credentials, setCredentials] = React.useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    })

    const handleSubmit = (event) => {
        console.log(credentials)
        event.preventDefault();
        dispatch(authRegisterAction(credentials))

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


    return (
        <div className="register-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit} className="register-form">
                <div>
                    <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField onChange={event => handleInputChange(event)} name="name" id="input-with-icon-grid" label="Name" value={credentials.name} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField onChange={handleInputChange} name="surname" id="input-with-icon-grid" label="Surname"  value={credentials.surname} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div>
                    <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <EmailIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={event => handleInputChange(event)} name="email" id="input-with-icon-grid" label="Email" value={credentials.email} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={handleInputChange} name="password" id="input-with-icon-grid" label="Password" type="password" value={credentials.password} />
                            </Grid>
                        </Grid>
                    </div>
                </div>





                <Button size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Register
                </Button>
            </form>
            <Link href='/'> Go back home</Link >

        </div>
    )
}

export default Register
