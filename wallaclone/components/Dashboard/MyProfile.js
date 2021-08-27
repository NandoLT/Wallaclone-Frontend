import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError, getUserId, getMyProfileDetails } from '../../store/selectors';
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

const MyProfile = ({myProfileDetails}) => {
    const dispatch = useDispatch();

    const[profileDetails, setProfileDetails] = useState({
        photo: null,
        nickname: "Kevin",
        description: null,
        province: null
    });

    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => {
        setEditMode(!editMode);
    }
    
    const [photoUploaded, setPhotoUploaded] = React.useState(false);

    useEffect( async () => {
            
           dispatch(getMyProfileAction());

        
    }, [])

    return (
        <div>

            {editMode ? 

                <div>
                    <p><button onClick={handleEditMode}>Deshacer cambios</button></p>
                    <h3>Edición de mi perfil</h3>
                    <EditUserProfile/>
                </div>

                

                :

                <div className="card">

                     
                            <div>
                                <div onClick={handleEditMode} className="image-container" >
                                {profileDetails.photo ? <Image  src="/profilePhoto.jpg" alt="me" width="100%" height="100%" />
                                : 
                                <div>
                                    <Image  src="/photo-upload.png" alt="me" width="80%" height="80%" />
                                    <MissingField title="Foto de perfil" message={"Aún no has subido una imagen. Haz click en editar para subir tu foto de perfil"}/>

                                </div>
                                }
                                </div>  




                                {profileDetails.nickname ? <h1>{profileDetails.nickname}</h1> : <div className="missing-container" onClick={handleEditMode}> <MissingField  title="Nickname" message=" Todavía no has elegido un nickname para tu perfil. Haz click para elegir uno"/> </div> }
                                
                                {profileDetails.description ? <h4 className="title">{profileDetails.description}</h4> : <div className="missing-container" onClick={handleEditMode}> <MissingField  title="Descripción" message=" Todavía no has añadido una descripción a tu perfil. Hac click en editar para contarnos sobre tí"/> </div>  }

                                {profileDetails.province ? <h5>{profileDetails.province}</h5> : <div className="missing-container"  onClick={handleEditMode}> <MissingField  title= "Provincia" message=" Aún no has especificado tu provincia. Hac click en editar para añadirla a tu perfil y hacer que otros usuarios encuentren tus anuncios más fácilmente."/> </div> }


                                <p><button onClick={handleEditMode}>Editar perfil</button></p>

                            </div>

                    
                    
                

                 
                
             </div>
            }
            
            

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
                        font-size: 18px;
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
    userId: getUserId(state),
    myProfileDetails: getMyProfileDetails(state),
  }); 
  
  export default connect(mapStateToProps)(WithAuth(MyProfile))
