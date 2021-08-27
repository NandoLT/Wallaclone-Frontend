import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged } from '../store/selectors';
import { authLogoutAction } from '../store/actions';
import { Grid, Menu } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import client from "../api/client";
import { PictureAsPdf } from '@material-ui/icons';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Image from 'next/image';


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
  },
  navbar: {
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
  },
  profile: {
    width: 'fit-content',
    '&:hover': {
      color: theme.palette.primary.main,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    margin: {
      marginRight: 10
    }
  },

}));


const NavBar = ({ isLogged }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [pic, setPic] = useState('');
  const [search, setSearch] = useState('')

  const onChange = ev => {
    setSearch(ev.target.value)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    router.push(`/adverts?name=${search}`)
  }

  const logoutConfirmation = () => {
    dispatch(authLogoutAction());
  }

  useEffect(() => {
    async function fetchUserImg() {
      const url = await client.get(process.env.REACT_APP_API_BASE_URL_DEPLOYED + `/getUserImage`);
      console.log(url)
      setPic(url);
    }

    fetchUserImg();
  }, [])


  return (
    <div className={"navbar"} style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Grid container className={classes.root, classes.navbar} direction="row"
        justify="space-between"
        alignItems="center">
        <Link href='/adverts' passHref>
          <Typography className={classes.logo}>Wallaclone</Typography>
        </Link>

        <Hidden smDown>
          <Grid container item md={7} lg={5} direction="row" justify="space-between" alignItems="center">
            <form onSubmit={submitSearch}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={onChange}
                  value={search}
                />
              </div>
            </form>
            {
              isLogged ? <Grid container item md={5} lg={5} direction="row" justify="space-between" alignItems="center">
                <Link href="#" className={classes.margin}>
                  <a className={classes.profile}>
                    <Image src={pic} />
                    Mi perfil
                  </a>
                </Link>


                <Link href="/create-advert">
                  <Button variant="contained" color="primary" className={"whiteText"}>
                    Subir producto
                  </Button>
                </Link>
              </Grid> :

                <Link href="/login">
                  <Button variant="contained" color="primary" className={"whiteText"}>
                    Login
                  </Button>
                </Link>
            }


          </Grid>
        </Hidden>
        <Hidden mdUp>
          <IconButton >
            <MenuIcon />
          </IconButton>
        </Hidden>

      </Grid>




    </div >



  );
}


const mapStateToProps = state => ({
  isLogged: getIsLogged(state),
})



export default connect(mapStateToProps)(NavBar)