import styles from '../../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import { Link, ListItem, ListItemIcon } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Divider } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },

}));

 const dashboard2 = () =>{
     const classes = useStyles();

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
                <div id="photo"><Image src="/profilePhoto.jpg" alt="me" width="64" height="64" /></div>
                <div id="name"><span>Jaime Pérez</span></div>
            </div>

            <div id="menu-items">
                <div className = "item">
                    <div className="href">
                        <div className="icon" ><Image className="icon" src="/star.png" alt="me" width="20" height="20" /></div>
                        <div className = "title">Mis anuncios</div>
                    </div>
                    <div className = "item separator"> </div>
                    <div className="href">
                        <div className="icon" ><Image className="icon" src="/heart.png" alt="me" width="20" height="20" /></div>
                        <div className = "title">Mis favoritos</div>
                    </div>
                    <div className = "item separator"> </div>
                    <div className="href">
                        <div className="icon" ><Image className="icon" src="/email (1).png" alt="me" width="20" height="20" /></div>
                        <div className = "title">Mis conversaciones</div>
                    </div>
                </div>
            </div>

        </div>
        <div id="main-container">
            
        </div>
        </>
    )
}

export default dashboard2;