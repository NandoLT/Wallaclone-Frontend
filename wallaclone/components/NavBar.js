
import React from 'react';

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
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    fontSize: 50,
    cursor: 'pointer',
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }

}));


export default function NavBar() {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const classes = useStyles();



  const logoutConfirmation = () => {
    dispatch(authLogoutAction());

  }

  return (
    <div className={"navbar"} style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Grid container className={classes.root} direction="row"
        justify="space-between"
        alignItems="center">
        <Link href='/adverts' passHref>
          <Typography className={classes.logo}>Wallaclone</Typography>
        </Link>


        <Grid item container xs={2} direction="row" justify="space-between" alignItems="center">
          <Link href="#" >
            <a className={"profile-link"}>
              Mi perfil
            </a>
          </Link>

          <Link href="">
            <Button variant="contained" color="primary" className={"whiteText"}>
              Subir producto
            </Button>
          </Link>
        </Grid>

      </Grid>




    </div>



  );
}
{/* <div className={classes.root}>
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
      <Link href='create-advert' passHref>
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
</div> */}