import styles from '../../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import { Avatar, Link, ListItem, ListItemIcon } from '@material-ui/core';
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

import React from 'react';

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
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconRoot: {
        minWidth: 0,
    },
    iconBackground: {
        backgroundColor: '#ADADAC',
        padding: 15,
        borderRadius: 100,
        color: '#fff'
    },
    iconSelected: {
        backgroundColor: theme.palette.primary.main,
        padding: 15,
        borderRadius: 100,
        color: '#fff'
    },
    menuLink: {
        textDecoration: 'none',
        color: '#fff',
        '&:hover': {
            textDecoration: 'none',
        }
    },

}));

const Dashboard = ({ myProfileDetails }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [content, setContent] = React.useState({
        myAdverts: false,
        myFavorites: false,
        myConversations: false,
        myProfile: true,
    });

    const openTab = (tab) => {
        setContent({
            myAdverts: "myAdverts" === tab,
            myFavorites: "myFavorites" === tab,
            myConversations: "myConversations" === tab,
            myProfile: "myProfile" === tab,
        })
    };

    const [userImage, setUserImage] = React.useState(null);


    const resetUi = () => {
        setContent({
            myAdverts: false,
            myFavorites: false,
            myConversations: false,
            myProfile: true,
        })
    }



    React.useEffect(() => {


        async function fetchMyData() {
            await dispatch(getMyProfileAction());
            await dispatch(fetchMyAdvertsAction());
            await dispatch(getMyFavoriteAdvertsAction());
        }
        fetchMyData();
    }, [])

    const { myAdverts, myFavorites, myConversations, myProfile } = content;

    const [menuExpanded, setMenuExpanded] = React.useState(true);
    const handleOpenMenu = () => {
        setMenuExpanded(!menuExpanded);
    }

    return (
        <div className={classes.dashboard}>
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
                    <Link href="/user/dashboard" className={classes.menuLink}>
                        <ListItem button key={1} className={classes.column}>
                            <ListItemIcon className={classes.iconRoot}><Avatar>L</Avatar></ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>
                    </Link>
                    <Link href="/user/dashboard" className={classes.menuLink}>
                        <ListItem button key={1} className={classes.column}>
                            <ListItemIcon className={classes.iconRoot, classes.iconBackground, classes.iconSelected}><LocalAtmIcon /></ListItemIcon>
                            <ListItemText primary={'Mis anuncios'} />
                        </ListItem>
                    </Link>
                    <Link href="/user/dashboard" className={classes.menuLink}>
                        <ListItem button key={1} className={classes.column}>
                            <ListItemIcon className={classes.iconRoot, classes.iconBackground}><FavoriteIcon /></ListItemIcon>
                            <ListItemText primary={'Favoritos'} />
                        </ListItem>
                    </Link>
                    <Link href="/user/dashboard" className={classes.menuLink}>
                        <ListItem button key={1} className={classes.column}>
                            <ListItemIcon className={classes.iconRoot, classes.iconBackground}><ChatIcon /></ListItemIcon>
                            <ListItemText primary={'Mensajes'} />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>


            <div className={menuExpanded ? "main-container-expanded" : "main-container"}>

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