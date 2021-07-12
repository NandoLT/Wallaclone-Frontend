import React from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { authLoginAction } from '../store/actions';
import { useDispatch, connect } from 'react-redux';
import Loading from '../components/Loading';
import { getIsLogged, getIsLoading } from '../store/selectors';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));



// const handleSubmit = (remember, credentials) =>{
//     dispatch(authLogin(credentials))

// }


const Login = ({isLogged, isLoading}) => {

    const dispatch = useDispatch();
    const classes = useStyles();


    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })
    const [remember, setRemember] = React.useState(false);


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
            

            
                 <form onSubmit={handleSubmit} className="login-form">
                 <div className={classes.margin, "login-input"}>
                     <Grid container spacing={1} alignItems="flex-end">
                         <Grid item>
                             <AccountCircle />
                         </Grid>
                         <Grid item>
                             <TextField onChange={event => handleInputChange(event)} name="email" id="input-with-icon-grid" label="Username" value={credentials.email} />
                         </Grid>
                     </Grid>
                 </div>
                 <div className={classes.margin, "login-input"}>
                     <Grid container spacing={1} alignItems="flex-end">
                         <Grid item>
                             <LockIcon />
                         </Grid>
                         <Grid item>
                             <TextField onChange={handleInputChange} name="password" id="input-with-icon-grid" label="Password" type="password" value={credentials.password} />
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
 
                {!isLoading &&  <Button size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                     Login
                 </Button>}
            
                
                 
             </form>
            

           

          
            {isLoading && <Loading/>}

            <Link href='/'>
                Go back home
            </Link >
        </div>

        

    )
}
const mapStateToProps = (state) => ({ 
    isLogged: getIsLogged(state),
    isLoading: getIsLoading(state), 
}); // Para poder conectar el componente al estado de redux

// const mapDispatchToProps = (dispatch) => ({
//     onLogin: () => dispatch(authLoginAction()),
//     onLogout: () => dispatch(authLogout())
// }); //Para poder conectar el componente al dispatch de redux

export default connect(mapStateToProps)(Login)
//export default Login;
