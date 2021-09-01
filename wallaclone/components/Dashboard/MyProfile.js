import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError, getMyProfileDetails } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction, fetchMyAdvertsAction, getMyProfileAction } from '../../store/actions';
import { getMyAdverts } from '../../store/selectors';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Image from 'next/image';
import MissingField from './MissingField';
import EditUserProfile from './EditUserProfile';
import WithAuth from '../hocs/WithAuth';
import { getMyProfile } from '../../api/users';
import RoomIcon from '@material-ui/icons/Room';
import parseAuthToken from '../../utils/parseAuthToken';
import { CardMedia } from '@material-ui/core';
import { logout } from '../../api/auth';
import { useRouter } from 'next/router';
import { authLogout } from '../../store/actions';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        maxWidth: '700px',
        minWidth: '300px',
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        position: 'relative'
    },
    card: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        width: '100%',
        marginTop: '40px',
        textAlign: 'center',
        position: 'relative',
        padding: 20
    },
    logout: {
        color: theme.palette.text.secondary,
        alignSelf: 'flex-end'
    },
    editButton: {
        minWidth: '0',
        color: theme.palette.text.secondary,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    profilePicContainer: {
        display: 'flex',
        justifyContent: 'center',

    },
    profilePic: {
        width: 150,
        height: 150
    }
}));

const MyProfile = ({ myProfileDetails }) => {
    const userId = parseAuthToken();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => {
        setEditMode(!editMode);
    }


    const logoutAction = () => {
        async function fetch() {
            await logout();
            dispatch(authLogout());
        }
        fetch()
    }


    return (
        <div className={classes.root}>
            {
                !editMode &&
                <Button className={classes.logout} variant="outlined" onClick={logoutAction} startIcon={<ClearIcon />}>Logout</Button>
            }
            {editMode ?

                <div>
                    <p><button onClick={handleEditMode}>Deshacer cambios</button></p>
                    <h3>Edición de mi perfil</h3>
                    <EditUserProfile handleEditMode={handleEditMode} />
                </div>

                :

                <div className={classes.card}>

                    {myProfileDetails &&

                        <div>
                            <div className={classes.profilePicContainer}>
                                {myProfileDetails.photo ?
                                    <Avatar
                                        src={process.env.REACT_APP_BASE_URL_IMAGES_DIRECTORY + userId + '/' + myProfileDetails.photo[0]}
                                        alt="me"
                                        className={classes.profilePic}
                                    />
                                    :
                                    <div>

                                        <Avatar
                                            image={"/photo-upload.png"}
                                        />
                                        <MissingField title="Foto de perfil" message={"Aún no has subido una imagen. Haz click en editar para subir tu foto de perfil"} />

                                    </div>
                                }
                            </div>

                            {myProfileDetails.nickname ?
                                <h1>{myProfileDetails.nickname}</h1>
                                :
                                <div className="missing-container" onClick={handleEditMode}>
                                    <MissingField title="Nickname" message=" Todavía no has elegido un nickname para tu perfil. Haz click para elegir uno" />
                                </div>}

                            {myProfileDetails.description ?
                                <h4 className="title">{myProfileDetails.description}</h4>
                                :
                                <div className="missing-container" onClick={handleEditMode}>
                                    <MissingField title="Descripción" message=" Todavía no has añadido una descripción a tu perfil. Hac click en editar para contarnos sobre tí" />
                                </div>}

                            {myProfileDetails.province ?
                                <div>
                                    <RoomIcon /> <span className="province">{myProfileDetails.province}</span> </div>
                                :
                                <div className="missing-container" onClick={handleEditMode}>
                                    <MissingField title="Provincia" message=" Aún no has especificado tu provincia. Hac click en editar para añadirla a tu perfil y hacer que otros usuarios encuentren tus anuncios más fácilmente." />
                                </div>}

                            <Button className={classes.editButton} size="small" variant="text" color="primary" disableElevation onClick={handleEditMode}><EditIcon /></Button>

                        </div>

                    }

                </div>
            }

            <style jsx>{`
                    

                    

                    .icon-container {
                        margin: 0 35px;
                    }

                    .icon-title {
                        font-size: 15px;
                    }

                    .icons-container {
                        padding: 15px 0;
                        display: flex;
                        flex-direction:row;
                        justify-content: center;
                        
                        border-top: 1px solid black;
                    }
                    
                    .title {
                        color: grey;
                        font-size: 16px;
                        padding: 10px 30px;
                    }

                    .province{
                        font-size: 20px;
                    }
                    
                    a {
                        text-decoration: none;
                        font-size: 22px;
                        color: black;
                    }
                    

                    .missing-container{
                        cursor:pointer;
                    }

                    `}</style>

        </div>
    )
}

const mapStateToProps = (state) => ({
    isLogged: getIsLogged(state),
    isLoading: getIsLoading(state),
    error: getError(state),
    myProfileDetails: getMyProfileDetails(state),
});

export default connect(mapStateToProps)(WithAuth(MyProfile))


