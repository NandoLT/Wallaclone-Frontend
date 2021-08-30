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

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    card: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        width: '600px',
        marginTop: '40px',
        textAlign: 'center'
    },
    logout: {
        color: '#fff'
    }
});

const MyProfile = ({ myProfileDetails }) => {
    const userId= parseAuthToken();
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    const [photoUploaded, setPhotoUploaded] = React.useState(false);

    const logoutAction = () => {
        async function fetch() {
            await logout();
            dispatch(authLogout());
        }
        fetch()
    }


    return (
        <div className={classes.root}>

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
                            <div onClick={handleEditMode} className="image-container" >
                                {myProfileDetails.photo ?  
                                    <img 
                                        src={'https://pruebas-wallaclone.s3.eu-west-3.amazonaws.com/' +  userId + '/' + myProfileDetails.photo[0]}
                                        alt="me" 
                                        width="100%" 
                                        height="100%" 
                                    />
                                    :
                                    <div>

                                        <CardMedia
                                            className={classes.media}
                                            image={"/photo-upload.png"}
                                            title="Product image"
                                        /> 

    
                    
                                        <MissingField title="Foto de perfil" message={"Aún no has subido una imagen. Haz click en editar para subir tu foto de perfil"} />

                                    </div>
                                }
                            </div>




                            {myProfileDetails.nickname ? <h1>{myProfileDetails.nickname}</h1> : <div className="missing-container" onClick={handleEditMode}> <MissingField title="Nickname" message=" Todavía no has elegido un nickname para tu perfil. Haz click para elegir uno" /> </div>}

                            {myProfileDetails.description ? <h4 className="title">{myProfileDetails.description}</h4> : <div className="missing-container" onClick={handleEditMode}> <MissingField title="Descripción" message=" Todavía no has añadido una descripción a tu perfil. Hac click en editar para contarnos sobre tí" /> </div>}

                            {myProfileDetails.province ? <div> <RoomIcon /> <span className="province">{myProfileDetails.province}</span> </div> : <div className="missing-container" onClick={handleEditMode}> <MissingField title="Provincia" message=" Aún no has especificado tu provincia. Hac click en editar para añadirla a tu perfil y hacer que otros usuarios encuentren tus anuncios más fácilmente." /> </div>}


                            <p><button onClick={handleEditMode}>Editar perfil</button></p>

                        </div>

                    }










                </div>
            }
            <Button color="primary" className={classes.logout} variant="contained" onClick={logoutAction}>Logout</Button>



            <style jsx>{`
                    
                    .card {
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                        width: 600px;
                        margin-top: 40px;
                        text-align: center;
                    }

                    .image-container {
                        cursor: pointer;
                        padding: 25px 0;
                    }

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
                    
                    button {
                        border: none;
                        outline: 0;
                        display: inline-block;
                        padding: 8px;
                        color: white;
                        background-color: #3F51B5;
                        text-align: center;
                        cursor: pointer;
                        width: 100%;
                        font-size: 18px;
                    }
                    
                    a {
                        text-decoration: none;
                        font-size: 22px;
                        color: black;
                    }
                    
                    button:hover, a:hover {
                        opacity: 0.7;
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


