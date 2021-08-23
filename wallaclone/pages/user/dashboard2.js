import styles from '../../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import { Link, ListItem, ListItemIcon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Divider } from '@material-ui/core';
import MyAdverts from '../../components/Dashboard/MyAdverts';
import MyConversations from '../../components/Dashboard/MyConversations';
import MyFavoriteAds from '../../components/Dashboard/MyFavoriteAds';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },

}));

 const dashboard2 = () =>{
     const classes = useStyles();
     const [content, setContent] = React.useState({
        myAdverts:true,
        myFavorites:false,
        myConversations:false,
    });

    const openTab = (tab) =>{
        setContent({
            myAdverts:"myAdverts" === tab,
            myFavorites:"myFavorites" === tab,
            myConversations:"myConversations" === tab,
          })
    };

    const resetUi = () => {
        setContent({
            myAdverts:true,
            myFavorites:false,
            myConversations:false,
          })
    }
    
    React.useEffect(() => {
        resetUi();
        
    }, []);

    const {myAdverts, myFavorites, myConversations} = content;

     const [menuExpanded, setMenuExpanded] = React.useState(false);
     const handleOpenMenu= () => {
         setMenuExpanded(!menuExpanded);
     }

    return (
        <>
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
            <label for="avatar"><div id="photo"><Image src="/profilePhoto.jpg" alt="me" width="64" height="64" /></div></label>

        <input hidden type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"/>
                
                <div id="name"><span>Jaime Pérez</span></div>
            </div>

            <div id="menu-items">
                <div className = "item">
                    <div onClick={()=> openTab("myAdverts")} className="href">
                        <div className="icon" ><Image className="icon" src="/star.png" alt="me" width="20" height="20" /></div>
                        <div className = "title">Mis anuncios</div>
                    </div>
                    <div className = "item separator"> </div>
                    <div onClick={()=> openTab("myFavorites")} className="href">
                        <div className="icon" ><Image className="icon" src="/heart.png" alt="me" width="20" height="20" /></div>
                        <div className = "title">Mis favoritos</div>
                    </div>
                    <div className = "item separator"> </div>
                    <div onClick={()=> openTab("myConversations")} className="href">
                        <div className="icon" ><Image className="icon" src="/email (1).png" alt="me" width="20" height="20" /></div>
                        <div className = "title">Mis conversaciones</div>
                    </div>
                </div>
            </div>

        </div>
        
        <div className={menuExpanded ? "main-container-expanded" : "main-container" }>
            
        {myAdverts && <MyAdverts/>}
        {myFavorites &&  <MyFavoriteAds/>}
        {myConversations && <MyConversations/>}
            
        </div>
        </>
    )
}

export default dashboard2;