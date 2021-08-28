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
import { authRegisterAction } from '../../store/actions';
import { purple } from '@material-ui/core/colors';
import Link from 'next/link';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    palette: {
        primary: {
            main: purple[500]
        }
    }
}));

const RegisterForm = ({ isLoading, error }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = React.useState({
        name: '',
        username: '',
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

        if (!credentials.password) {
            return true
        }

        return false;
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        dispatch(authRegisterAction(remember, credentials))

    }

    return (
        <>

            <form onSubmit={handleSubmit} className="register-form">
                <div className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={1}>
                            <AccountCircle />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField required onChange={event => handleInputChange(event)} name="name" id="input-with-icon-grid" label="Name" value={credentials.name} fullWidth />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={1}>
                            <AccountCircle />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField required onChange={event => handleInputChange(event)} name="username" id="input-with-icon-grid" label="Username" value={credentials.username} fullWidth />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={1}>
                            <MailIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField required onChange={handleInputChange} name="email" id="input-with-icon-grid" label="Email" type="email" value={credentials.email} fullWidth />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={1}>
                            <LockIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField required onChange={handleInputChange} name="password" id="input-with-icon-grid" label="Password" type="password" value={credentials.password} fullWidth />
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
                <div className="auth-buttons">
                    <Link href='/login'>Already registered? Login</Link>
                    {!isLoading && <Button disabled={validation()} size="large" variant="contained" color="primary" type="submit">
                        Register
                    </Button>}
                </div>



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

export default connect(mapStateToProps)(RegisterForm)