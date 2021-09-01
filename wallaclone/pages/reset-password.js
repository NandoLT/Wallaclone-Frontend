import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch, connect } from 'react-redux';
import Loading from '../components/Loading';
import Alert from '../components/Alert'
import { getIsLoading, getError, getUserId, getSuccessMessage } from '../store/selectors'
import styles from '../styles/Home.module.css'
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { authresetPasswordAction, confirmPasswordFailureAction, authResetState } from '../store/actions';
import SuccessAlert from '../components/SuccessAlert';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const ResetPassword = ({ isLoading, error, successMessage }) => {

    const classes = useStyles();
    const dispatch = useDispatch();




    const [passwords, setPasswords] = React.useState({
        newPassword: '',
        confirmNewPassword: '',

    });


    React.useEffect(() => {
        dispatch(authResetState());
    }, [])


    const handleInputChange = event => {
        setPasswords(oldPasswords => {

            const newPasswords = {
                ...oldPasswords,
                [event.target.name]: event.target.value,
            }
            return newPasswords
        });

    }


    const validation = () => {

        if (!passwords.newPassword) {
            return true
        };

        if (!passwords.confirmNewPassword) {
            return true
        };

        return false;
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            dispatch(confirmPasswordFailureAction("Las contraseñas no coinciden"));
            setPasswords(oldPasswords => {

                const newPasswords = {
                    ...oldPasswords,
                    confirmNewPassword: '',
                }
                return newPasswords
            });
            return
        }
        dispatch(authresetPasswordAction(passwords));


    }

    return (
        <div className={classes.root}>
            <h1>Establece tu nueva contraseña</h1>
            <p>Por favor, elige tu nueva contraseña y ponla en los cuadros más abajo </p>

            <form onSubmit={handleSubmit}>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField required onChange={handleInputChange} name="newPassword" id="input-with-icon-grid" label="Nueva contraseña" type="password" value={passwords.newPassword} />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField required onChange={handleInputChange} name="confirmNewPassword" id="input-with-icon-grid" label="Confirma contraseña" type="password" value={passwords.confirmNewPassword} />
                        </Grid>
                    </Grid>
                </div>



                {!isLoading && <Button disabled={validation()} size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Recuperar contraseña
                </Button>}

                {error && <Alert />}
                {(successMessage) && <SuccessAlert message="Contraseña actualizada con éxito" />}


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

export default connect(mapStateToProps)(ResetPassword)