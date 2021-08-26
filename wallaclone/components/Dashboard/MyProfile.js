import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction, fetchMyAdvertsAction } from '../../store/actions';
import { getMyAdverts } from '../../store/selectors';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Image from 'next/image';
import MissingField from './MissingField';

const MyProfile = () => {

    const[profileDetails, setProfileDetails] = useState({
        photo:null,
        description:null,
        province: null,
    })
    
    const [photoUploaded, setPhotoUploaded] = React.useState(false);

    const setPhoto = event => {
        setPhotoUploaded(true);
      setProfileDetails(oldProfileDetails => {
          const newProfileDetails = {
              ...oldProfileDetails,
              'photo': event.target.files[0]
          }
          return newProfileDetails;
      });
    }

    return (
        <div>
            
            <div className="card">
                

                <label for ="avatar"> <div className="image-container" >
                    {profileDetails.photo ? <Image  src="/profilePhoto.jpg" alt="me" width="100%" height="100%" />
                    : 
                    <div>
                        <Image  src="/photo-upload.png" alt="me" width="100%" height="100%" />
                        <MissingField title="Foto de perfil" message={"Aún no has subido una imagen. Haz click en editar para subir tu foto de perfil"}/>

                    </div>
                      }
                    </div>  </label>
                    <input 
                    hidden type="file"
                    id="avatar" 
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={setPhoto}
                    />



                
            
                <h1>John Doe</h1>
                {profileDetails.description ? <h4 className="title">{profileDetails.description}</h4> : <MissingField title="Descripción" message=" Todavía no has añadido una descripción a tu perfil. Hac click en editar para contarnos sobre tí"/> }

                {profileDetails.province ? <h5>{profileDetails.province}</h5> : <MissingField title= "Provincia" message=" Aún no has especificado tu provincia. Hac click en editar para añadirla a tu perfil y hacer que otros usuarios encuentren tus anuncios más fácilmente."/>}
               
                {/* <div className="icons-container">
                    <div className="icon-container">
                        <div className="icon" ><Image className="icon" src="/star.png" alt="me" width="30" height="30" />
                        <div className="icon-title">Mis anuncios</div>
                    </div>
                </div>

                <div className="icon-container">
                    <div className="icon" ><Image className="icon" src="/heart.png" alt="me" width="30" height="30" />
                    <div className="icon-title">Mis favoritos</div>
                    </div>
                </div>
                
                <div className="icon-container">
                    <div className="icon" ><Image className="icon" src="/email (1).png" alt="me" width="30" height="30" />
                    <div className="icon-title">Mis conversaciones</div>
                    </div>

                    </div>
            
                 </div> */}
                <p><button>Editar perfil</button></p>
                
             </div>

             <style jsx>{`
                    
                    .card {
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                        width: 600px;
                        margin-top: 40px;
                        text-align: center;
                    }

                    .image-container {
                        cursor: pointer;
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
                        background-color: #000;
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

                    `}</style>

        </div>
    )
}

export default MyProfile

