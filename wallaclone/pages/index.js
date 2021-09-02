import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { authLogin, authLogout } from '../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardMedia } from '@material-ui/core';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getIsLogged } from '../store/selectors';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  top: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  },
  topTitle: {
    margin: 0,
    fontSize: 60
  },
  topSubtitle: {
    color: theme.palette.text.secondary
  },
  topButton: {
    color: theme.palette.text.secondary,
    padding: 10,
    width: 'fit-content'
  },
  topLogin: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  section: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  subSection: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  subSectionText: {
    fontSize: 30,
  },
  subSectionImg: {
    width: '30%'
  },
}));

const Home = ({ isLogged }) => {

  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      router.replace('/adverts?limit=8&skip=0')
    }
  }, [])


  return (

    <div>

      {!isLogged &&
        <>
          <div className={classes.top}>
            <div className={classes.topCard}>
              <h1 className={classes.topTitle}>WALLACLONE</h1>
              <h2 className={classes.topSubtitle}>La mejor plataforma de compra y venta para artículos de segunda mano</h2>
              <Link href='/register'>
                <Button variant="contained" className={classes.topButton}>Registrarse</Button>
              </Link>
              <Link href='/login'>
                <p className={classes.topLogin}>Ya estas registrado? Inicia sesión</p>
              </Link>
              <Link href='/adverts?limit=8&skip=0'>
                <p className={classes.topLogin}>Llevame a los productos</p>
              </Link>
            </div>
          </div>
          <Grid container className={classes.section}>
            <Grid item xs={12} sm={8} className={classes.subSection}>
              <p className={classes.subSectionText}>Sube tus productos para venderlos,<br />o pon anuncios para buscar vendedores.</p>
              <Link href='/register'>
                <Button variant="contained" className={classes.topButton}>Registrarse</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.subSectionImg}>
              <CardMedia image="/img/landingSVG.svg"
                component="img"
                alt="Image"
                title="Image" />
            </Grid>
          </Grid>
          <Grid container className={classes.section}>
            <Grid item xs={12} sm={4} className={classes.subSectionImg}>
              <CardMedia image="/img/landingSVG2.svg"
                component="img"
                alt="Image"
                title="Image" />
            </Grid>
            <Grid item xs={12} sm={8} className={classes.subSection}>
              <p className={classes.subSectionText}>Añade productos a <br />favoritos para no perderte las novedades</p>
              <Link href='/register'>
                <Button variant="contained" className={classes.topButton}>Registrarse</Button>
              </Link>
            </Grid>
          </Grid>
          <Grid container className={classes.section}>
            <Grid item xs={12} sm={8} className={classes.subSection}>
              <p className={classes.subSectionText}>Chatea con los vendedores o <br />con tus clientes para llegar a un acuerdo</p>
              <Link href='/register'>
                <Button variant="contained" className={classes.topButton}>Registrarse</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.subSectionImg}>
              <CardMedia image="/img/landingSVG3.svg"
                component="img"
                alt="Image"
                title="Image" />
            </Grid>
          </Grid>
        </>
      }


    </div>



  )
}

const mapStateToProps = state => ({
  isLogged: getIsLogged(state),
})

export default connect(mapStateToProps)(Home)