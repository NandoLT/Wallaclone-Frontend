import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import { Avatar, Hidden, Link, ListItem, ListItemIcon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Divider } from '@material-ui/core';
import MyAdverts from '../../components/Dashboard/MyAdverts';
import MyConversations from '../../components/Dashboard/MyConversations';
import MyFavoriteAds from '../../components/Dashboard/MyFavoriteAds';
import MyProfile from '../../components/Dashboard/MyProfile';
import { getUserImage } from '../../api/users';
import { getMyProfileAction, fetchMyAdvertsAction, getMyFavoriteAdvertsAction } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import WithAuth from '../../components/hocs/WithAuth';
import { getMyProfileDetails } from '../../store/selectors';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import green from '@material-ui/core/colors/green';

import React, { useEffect } from 'react';
import router, { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    dashboard: {
        display: 'flex',

    },
    drawer: {
        width: 150,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 150,
        top: 'auto',
        backgroundColor: '#616161'
    },
    menuLink: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#fff',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    iconRoot: {
        minWidth: 0,
    },
    icon: {
        backgroundColor: '#ADADAC',
        padding: 15,
        borderRadius: 100,
        color: '#fff',
        opacity: 0.3
    },
    iconSelected: {
        backgroundColor: theme.palette.primary.main,
        padding: 15,
        borderRadius: 100,
        color: '#fff'
    },

}));

const Dashboard = ({ myProfileDetails }) => {
    const dispatch = useDispatch();
    const classes = useStyles();


    const [content, setContent] = React.useState({
        myProfile: true,
        myAdverts: false,
        myFavorites: false,
        myConversations: false,
    });

    const [userImage, setUserImage] = React.useState(null);

    const changeContent = (tab) => {


        setContent({
            myProfile: "myProfile" === tab,
            myAdverts: "myAdverts" === tab,
            myFavorites: "myFavorites" === tab,
            myConversations: "myConversations" === tab,

        })
    }



    useEffect(() => {
        async function fetchMyData() {
            await dispatch(getMyProfileAction());
            await dispatch(fetchMyAdvertsAction());
            await dispatch(getMyFavoriteAdvertsAction());
        }
        fetchMyData();
    }, [])



    const { myAdverts, myFavorites, myConversations, myProfile } = content;

    return (
        <div className={classes.dashboard}>
            <Hidden smDown>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <Divider />
                    <List >
                        <ListItem button key={1} name="myProfile" className={classes.menuLink} onClick={() => changeContent("myProfile")}>
                            <ListItemIcon className={classes.iconRoot}><Avatar>L</Avatar></ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>


                        <ListItem button key={1} name="myAdverts" className={classes.menuLink} onClick={() => changeContent("myAdverts")}>
                            <ListItemIcon className={classes.iconRoot, content.myAdverts ? classes.iconSelected : classes.icon}><LocalAtmIcon /></ListItemIcon>
                            <ListItemText primary={'Mis anuncios'} />
                        </ListItem>


                        <ListItem button key={1} name="myFavorites" className={classes.menuLink} onClick={() => changeContent("myFavorites")}>
                            <ListItemIcon className={classes.iconRoot, content.myFavorites ? classes.iconSelected : classes.icon}><FavoriteIcon /></ListItemIcon>
                            <ListItemText primary={'Favoritos'} />
                        </ListItem>


                        <ListItem button key={1} name="myConversations" className={classes.menuLink} onClick={() => changeContent("myConversations")}>
                            <ListItemIcon className={classes.iconRoot, content.myConversations ? classes.iconSelected : classes.icon}><ChatIcon /></ListItemIcon>
                            <ListItemText primary={'Mensajes'} />
                        </ListItem>

                    </List>
                </Drawer>
            </Hidden>


            <div className={"main-container"}>

                {myAdverts && <MyAdverts />}
                {myFavorites && <MyFavoriteAds />}
                {myConversations && <MyConversations />}
                {myProfile && <MyProfile />}

            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    myProfileDetails: getMyProfileDetails(state),
});

export default connect(mapStateToProps)(WithAuth(Dashboard))