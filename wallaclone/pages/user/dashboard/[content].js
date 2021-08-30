
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import { Avatar, Hidden, Link, ListItem, ListItemIcon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Divider } from '@material-ui/core';
import MyAdverts from '../../../components/Dashboard/MyAdverts';
import MyConversations from '../../../components/Dashboard/MyConversations';
import MyFavoriteAds from '../../../components/Dashboard/MyFavoriteAds';
import MyProfile from '../../../components/Dashboard/MyProfile';
import { getUserImage } from '../../../api/users';
import { getMyProfileAction, fetchMyAdvertsAction, getMyFavoriteAdvertsAction } from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import WithAuth from '../../../components/hocs/WithAuth';
import { getMyProfileDetails } from '../../../store/selectors';
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
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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

    const { query } = useRouter();
    const contentShow = query.content;

    const [content, setContent] = React.useState({
        myProfile: false,
        myAdverts: false,
        myFavorites: false,
        myConversations: false,
    });

    const [userImage, setUserImage] = React.useState(null);





    useEffect(() => {
        async function fetchMyData() {
            await dispatch(getMyProfileAction());
            await dispatch(fetchMyAdvertsAction());
            await dispatch(getMyFavoriteAdvertsAction());
        }
        fetchMyData();
    }, [])

    useEffect(() => {
        if (contentShow) {

            const newContent = {
                myProfile: false,
                myAdverts: false,
                myFavorites: false,
                myConversations: false,
            }

            if (contentShow == 'me') {
                newContent.myProfile = true
            } else if (contentShow == 'adverts') {
                newContent.myAdverts = true
            } else if (contentShow == 'favorites') {
                newContent.myFavorites = true
            } else if (contentShow == 'messages') {
                newContent.myConversations = true
            } else {
                router.replace('/user/dashboard/me')
            }

            setContent(newContent)
        }

    }, [contentShow])

    const { myAdverts, myFavorites, myConversations, myProfile } = content;

    const [menuExpanded, setMenuExpanded] = React.useState(true);
    const handleOpenMenu = () => {
        setMenuExpanded(!menuExpanded);
    }

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
                        <Link href="/user/dashboard/me" className={classes.menuLink}>
                            <ListItem button key={1} className={classes.column}>
                                <ListItemIcon className={classes.iconRoot}><Avatar>L</Avatar></ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>
                        </Link>
                        <Link href="/user/dashboard/adverts" className={classes.menuLink}>
                            <ListItem button key={1} className={classes.column}>
                                <ListItemIcon className={classes.iconRoot, content.myAdverts ? classes.iconSelected : classes.icon}><LocalAtmIcon /></ListItemIcon>
                                <ListItemText primary={'Mis anuncios'} />
                            </ListItem>
                        </Link>
                        <Link href="/user/dashboard/favorites" className={classes.menuLink}>
                            <ListItem button key={1} className={classes.column}>
                                <ListItemIcon className={classes.iconRoot, content.myFavorites ? classes.iconSelected : classes.icon}><FavoriteIcon /></ListItemIcon>
                                <ListItemText primary={'Favoritos'} />
                            </ListItem>
                        </Link>
                        <Link href="/user/dashboard/messages" className={classes.menuLink}>
                            <ListItem button key={1} className={classes.column}>
                                <ListItemIcon className={classes.iconRoot, content.myConversations ? classes.iconSelected : classes.icon}><ChatIcon /></ListItemIcon>
                                <ListItemText primary={'Mensajes'} />
                            </ListItem>
                        </Link>
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