import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { useDispatch, connect } from 'react-redux';
import Loading from '../Loading';
import { getIsLogged, getIsLoading, getError } from '../../store/selectors';
import Alert from '../Alert'
import { authLoginAction } from '../../store/actions';
import styles from '../../styles/Home.module.css'
import EmailIcon from '@material-ui/icons/Email';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const LoginForm = ({isLoading, error  }) => {
    const classes = useStyles();
    const dispatch= useDispatch();

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })
    const [remember, setRemember] = React.useState(false);

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

    const validation = () => {

        if (!credentials.email) {
            return true
        };

        if(!credentials.password){
            return true
        }

        return false;
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();
        dispatch(authLoginAction(remember, credentials))

    }

    return (
        <>

        <form onSubmit={handleSubmit} className="login-form">
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <EmailIcon />
                        </Grid>
                        <Grid item>
                            <TextField required onChange={event => handleInputChange(event)} name="email" id="input-with-icon-grid" label="Email" value={credentials.email} />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin, "login-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField required onChange={handleInputChange} name="password" id="input-with-icon-grid" label="Password" type="password" value={credentials.password} />
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

                {!isLoading && <Button disabled={validation()} size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Login
                </Button>}

                {error && <Alert />}


            </form>
            {isLoading && <Loading />}

        </>
    )
}

const mapStateToProps = (state) => ({
    isLogged: getIsLogged(state),
    isLoading: getIsLoading(state),
    error: getError(state),
}); 

export default connect(mapStateToProps)(LoginForm)


