
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Hidden, Link, ListItem, ListItemIcon } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import MyAdverts from '../../../components/Dashboard/MyAdverts';
import MyConversations from '../../../components/Dashboard/MyConversations';
import MyFavoriteAds from '../../../components/Dashboard/MyFavoriteAds';
import MyProfile from '../../../components/Dashboard/MyProfile';
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
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import parseAuthToken from '../../../utils/parseAuthToken';

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
        backgroundColor: 'transparent',
        border: 'none'
    },
    menuLink: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        '&:hover': {
            textDecoration: 'none',
        }
    },
    menuLinkSelected: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        '&:hover': {
            textDecoration: 'none',
        },
        backgroundColor: '#D9D9D9'
    },
    iconRoot: {
        minWidth: 0,
    },
    icon: {
        backgroundColor: '#ADADAC',
        padding: 15,
        borderRadius: 100,
        color: '#fff',
        opacity: 0.3,
    },
    iconSelected: {
        backgroundColor: theme.palette.primary.main,
        padding: 15,
        borderRadius: 100,
        color: '#fff'
    },
    mainContent: {
        width: '100%',
        fontSize: 18,
        padding: 0,
        display: 'flex',
        justifyContent: 'center'
    },
    iconMenu: {
        width: 50,
        height: 50
    }

}));

const Dashboard = ({ myProfileDetails }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const userId = parseAuthToken();
    const router = useRouter();

    const { query } = useRouter();
    const contentShow = query.content;

    const [content, setContent] = React.useState({
        myProfile: false,
        myAdverts: false,
        myFavorites: false,
        myConversations: false,
    });

    const [userImage, setUserImage] = React.useState(null);


    const navigate = (content) => {
        router.push(`/user/dashboard/${content}`, undefined, { shallow: true })
    }



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
                        <ListItem button key={1} name="myProfile" className={content.myProfile ? classes.menuLinkSelected : classes.menuLink} onClick={() => navigate("me")}>
                            <ListItemIcon className={classes.iconRoot}>
                                {myProfileDetails ?
                                    myProfileDetails.photo ? <Avatar className={classes.iconMenu} src={process.env.REACT_APP_BASE_URL_IMAGES_DIRECTORY + userId + '/' + myProfileDetails.photo[0]} /> : ''
                                    :
                                    <Avatar></Avatar>
                                }
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>


                        <ListItem button key={1} name="myAdverts" className={content.myAdverts ? classes.menuLinkSelected : classes.menuLink} onClick={() => navigate("adverts")}>
                            <ListItemIcon className={classes.iconRoot, content.myAdverts ? classes.iconSelected : classes.icon}><LocalAtmIcon /></ListItemIcon>
                            <ListItemText primary={'Mis anuncios'} />
                        </ListItem>


                        <ListItem button key={1} name="myFavorites" className={content.myFavorites ? classes.menuLinkSelected : classes.menuLink} onClick={() => navigate("favorites")}>
                            <ListItemIcon className={classes.iconRoot, content.myFavorites ? classes.iconSelected : classes.icon}><FavoriteIcon /></ListItemIcon>
                            <ListItemText primary={'Favoritos'} />
                        </ListItem>


                        <ListItem button key={1} name="myConversations" className={content.myConversations ? classes.menuLinkSelected : classes.menuLink} onClick={() => navigate("messages")}>
                            <ListItemIcon className={classes.iconRoot, content.myConversations ? classes.iconSelected : classes.icon}><ChatIcon /></ListItemIcon>
                            <ListItemText primary={'Mensajes'} />
                        </ListItem>

                    </List>
                </Drawer>
            </Hidden>


            <div className={classes.mainContent}>

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