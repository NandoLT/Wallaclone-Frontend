import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch, connect } from 'react-redux';
import Loading from '../components/Loading';
import Alert from '../components/Alert'
import {getIsLoading, getError, getUserId, getSuccessMessage} from '../store/selectors'
import styles from '../styles/Home.module.css'
import EmailIcon from '@material-ui/icons/Email';
import { authrecoverPasswordAction } from '../store/actions';
import SuccessAlert from '../components/SuccessAlert';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const ForgotPassword = ({isLoading, error, successMessage}) => {

    const classes = useStyles();
    const dispatch= useDispatch();
    

    

    const [email, setEmail] = React.useState('');
    const [remember, setRemember] = React.useState(false);

    const handleInputChange = event => {
        setEmail(event.target.value);

    }


    const validation = () => {

        if (!email) {
            return true
        };


        return false;
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log(email)
        dispatch(authrecoverPasswordAction(email));

    }

    return (
        <div className="login-container">
            <h1>Recuperar contraseña</h1>
            <p>Por favor, pon tu email para poder reestablecer la contraseña</p>

        <form onSubmit={handleSubmit} className="login-form">
        <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <EmailIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={event => handleInputChange(event)} name="email" id="input-with-icon-grid" label="Email" value={email} />
                            </Grid>
                        </Grid>
                    </div>
               
                

                {!isLoading && <Button disabled={validation()} size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Recuperar contraseña
                </Button>}

                {error && <Alert />}
                {successMessage && <SuccessAlert message={successMessage}/>}


            </form>
            {isLoading && <Loading />}

        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading: getIsLoading(state),
    error: getError(state),
    successMessage: getSuccessMessage(state),
    
}); 

export default connect(mapStateToProps)(ForgotPassword)