
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged } from '../store/selectors';
import { authLogoutAction } from '../store/actions';
import ConfirmationPopup from '../components/ConfirmationPopup'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const classes = useStyles();

 

  const logoutConfirmation = () =>{
    dispatch(authLogoutAction());

}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           <Link href="/" passHref> Wallaclone </Link> 
          </Typography>
          
         
          <Link href='/register' passHref>
            <Button color="inherit">Registro</Button>
          </Link>
          <Link href='/adverts' passHref>
            <Button color="inherit">Anuncios</Button>
          </Link>
          <Link href='/create-advert' passHref>
            <Button color="inherit">Crear nuevo anuncio</Button>
          </Link>
          

            {isLogged ? 

                // <Button onClick={onLogout} variant="contained" color="secondary">Logout</Button>
                <ConfirmationPopup
                buttonText="Logout" 
                popupTitle="Logout" 
                popupDescription="¿Quieres confirmar el cierre de sesión?" 
                handleConfirmation={logoutConfirmation}
                />
                :
                <Link href='/login' passHref>
                    <Button variant="contained" color="secondary">Login</Button>
                </Link>
            
            }
         
          

        </Toolbar>
      </AppBar>
    </div>
  );
}