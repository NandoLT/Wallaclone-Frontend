import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MyAdverts from '../../components/Dashboard/MyAdverts';
import MyProfile from '../../components/Dashboard/MyProfile';
import { Button } from '@material-ui/core';
import MyFavoriteAds from '../../components/Dashboard/MyFavoriteAds';
import MyConversations from '../../components/Dashboard/MyConversations';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState({
      myAdverts:false,
      myProfile:true,
      myFavorites:false,
      myConversations:false,
  })
  const openMyAdverts= () => {
    setContent({
      myAdverts:true,
      myProfile:false,
      myFavorites:false,
      myConversations:false,
    })
}

const openMyProfile= () => {
    setContent({
      myAdverts:false,
      myProfile:true,
      myFavorites:false,
      myConversations:false,
    })
}

const openMyFavoriteAds= () => {
    setContent({
      myAdverts:false,
      myProfile:false,
      myFavorites:true,
      myConversations:false,
    })
}

const openMyConversations= () => {
    setContent({
      myAdverts:false,
      myProfile:false,
      myFavorites:false,
      myConversations:true,
    })
}

const resetUi = () => {
    setContent({
        myAdverts:false,
        myProfile:true,
        myFavorites:false,
        myConversations:false,
      })
}

React.useEffect(() => {
    resetUi();
    
}, [])

  const {myAdverts, myProfile, myFavorites, myConversations} = content;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mi zona de usuario
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        
        <ListItem>
        <ListItemIcon onClick={openMyProfile}><MailIcon /></ListItemIcon>
            <Button onClick={openMyProfile}>
                Mi Perfil
            </Button>
           
        </ListItem>

        <ListItem>
        <ListItemIcon onClick={openMyAdverts}><MailIcon /></ListItemIcon>
            <Button onClick={openMyAdverts}>
                Mis anuncios
            </Button>
           
        </ListItem>

        <ListItem>
        <ListItemIcon onClick={openMyFavoriteAds}><MailIcon /></ListItemIcon>
            <Button onClick={openMyFavoriteAds}>
                Favoritos
            </Button>
           
        </ListItem>
        <ListItem>
        <ListItemIcon onClick={openMyConversations}><MailIcon /></ListItemIcon>
            <Button onClick={openMyConversations}>
                Conversaciones
            </Button>
           
        </ListItem>
       

        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {myAdverts && <MyAdverts/>}
        {myProfile &&  <MyProfile/>}
        {myFavorites &&  <MyFavoriteAds/>}
        {myConversations && <MyConversations/>}
        
      </main>
    </div>
  );
}
