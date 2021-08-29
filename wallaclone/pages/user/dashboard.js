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
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        top: 'auto'
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
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div id="sidemenu" className={menuExpanded ? "menu-expanded" : "menu-collapsed"}>
                <div id="header">
                    <div id="title"> <span>Mi Perfil</span></div>
                    <div id="menu-btn" onClick={handleOpenMenu}>
                        <div className="btn-hamburger"></div>
                        <div className="btn-hamburger"></div>
                        <div className="btn-hamburger"></div>
                    </div>

                </div>
                <div id="profile">

                    {myProfileDetails

                        &&
                        <div onClick={() => openTab("myProfile")} id="photo"><Avatar src={myProfileDetails.photo ? process.env.REACT_APP_BASE_URL_IMAGES_DIRECTORY + `${''}` : '/img/image-not-available.png'} alt="me" width="64" height="64" /></div>


                    }



                    {myProfileDetails &&

                        <div id="name">{myProfileDetails.nickname ? <span>{myProfileDetails.nickname}</span> : <span> No nickname yet</span>}</div>

                    }

                </div>

                <div id="menu-items">

                    <div className="item">
                        <div onClick={() => openTab("myProfile")} className="href">
                            <div className="icon" ><Image className="icon" src="/user.png" alt="me" width="20" height="20" /></div>
                            <div className="title">Mi Perfil</div>
                        </div>
                        <div className="item separator"> </div>
                        <div onClick={() => openTab("myAdverts")} className="href">
                            <div className="icon" ><Image className="icon" src="/star.png" alt="me" width="20" height="20" /></div>
                            <div className="title">Mis anuncios</div>
                        </div>
                        <div className="item separator"> </div>
                        <div onClick={() => openTab("myFavorites")} className="href">
                            <div className="icon" ><Image className="icon" src="/heart.png" alt="me" width="20" height="20" /></div>
                            <div className="title">Mis favoritos</div>
                        </div>
                        <div className="item separator"> </div>
                        <div onClick={() => openTab("myConversations")} className="href">
                            <div className="icon" ><Image className="icon" src="/email (1).png" alt="me" width="20" height="20" /></div>
                            <div className="title">Mis conversaciones</div>
                        </div>
                    </div>
                </div>

            </div>

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