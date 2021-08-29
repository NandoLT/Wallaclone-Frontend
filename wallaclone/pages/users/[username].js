import React from 'react';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image'
import { getMyProfileDetails } from '../../store/selectors';
import { connect } from 'react-redux';
import WithAuth from '../../components/hocs/WithAuth';
import { getOtherUserProfile } from '../../api/users';
import RoomIcon from '@material-ui/icons/Room';
import AdvertCard from '../../components/Card';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    margin: {
        margin: theme.spacing(1),
    },

}));

const UserProfile = () => {
    const classes = useStyles();
    const router = useRouter();
    const  {username} = router.query;
    const [userProfileData, setUserProfileData] = React.useState(null);
    const [userProfileAdverts, setUserProfileAdverts] = React.useState(null);
    

    useEffect(() => {
        (async () => {
            if (username) {

                try {
                    const userProfileFetched = await getOtherUserProfile(username);
                    console.log(userProfileFetched);
                    setUserProfileData(userProfileFetched.user);
                    setUserProfileAdverts(userProfileFetched.adverts);
                    
                    
                } catch (error) {
                    console.log(error);
                }
                
                

            }
        })()

    }, [username])
    


    return (
        <div className="main-container">


        
        <div className="profile-container" >

            {userProfileData && 

            <div className="card">

                    {userProfileData.photo && <Image src="/profilePhoto.jpg" alt="me" width="100%" height="100%" />
                        
                        
                    }

                         <h1>{userProfileData.nickname}</h1> 

                        <h4 className="title">{userProfileData.description}</h4> 

                        <div> <RoomIcon/> <span className="province">{userProfileData.province}</span> </div>  


                        <p><button >Contactar Usuario</button></p>
                
                
             </div>
             }
            

            </div>
            <div>
                <div className="ads-container">

                {userProfileAdverts && <div>

                    { userProfileAdverts.map(advert => {

                        return (
                            <AdvertCard advert={advert} key={advert._id} />

                        )
                        })}

                </div>
                          
                        }

                </div>

                <div className="ads-container">
                    <h2> ANUNCIOS FAVORITOS</h2>

                </div>
                

            </div>

            <style jsx>{`

             .ads-container{
                
                      display:flex;
                      justify-content: flex-start;
                      flex-direction: row;
                      align-content: center;
                      flex-wrap: wrap;
                    
             }

                .main-container{
                    display:flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                }

                .profile-container{
                    
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 18px;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                }
                    
                    .card {
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                        width: 600px;
                        margin-bottom: 40px;
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
                        margin-bottom: 0px;
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


    );
}

const mapStateToProps = (state) => ({
    myProfileDetails: getMyProfileDetails(state),
});

export default connect(mapStateToProps)(WithAuth(UserProfile));