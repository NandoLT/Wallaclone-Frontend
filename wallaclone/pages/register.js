
import React, {useEffect} from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { authRegisterAction, authResetState } from '../store/actions';
import { useDispatch, connect } from 'react-redux';
import Loading from '../components/Loading';
import { getIsLogged, getIsLoading, getError } from '../store/selectors';
import Alert from '../components/Alert';
import styles from '../styles/Home.module.css'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));



const Register = ({isLogged, isLoading, error}) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(authResetState());
    }, []);


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


                {!isLoading &&  <Button size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                     Register
                 </Button>}
                 {error &&  <Alert/> }


            </form>
            {isLoading && <Loading/>}
            <div className={styles.card} >
                  <h3> <Link className={styles.card} href='/'> Go Back Home &rarr; </Link> </h3>
            </div>

        </div>
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
