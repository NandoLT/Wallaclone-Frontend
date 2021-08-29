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
    const [userProfile, setUserProfile] = React.useState(null);

    useEffect(() => {
        (async () => {
            if (username) {

                try {
                    const userProfileFetched = await getOtherUserProfile(username);
                    console.log(userProfileFetched);
                    setUserProfile(userProfileFetched);
                    
                } catch (error) {
                    console.log(error);
                }
                
                

            }
        })()

    }, [username])
    


    return (
        <div >

            <h1> Pagina de otro usuario</h1>

            

            <style jsx>{`
                    
                    
                    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
                        * {
                        box-sizing: border-box;
                        }
                        body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0;
                        background-color: #f7f8fc;
                        font-family: "Roboto", sans-serif;
                        color: #10182f;
                        }
                        .container {
                        display: flex;
                        width: 1040px;
                        justify-content: space-evenly;
                        flex-wrap: wrap;
                        }
                        .card {
                        margin: 10px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
                        overflow: hidden;
                        width: 500px;
                        
                        }
                        .card-header img {
                        width: 100%;
                        height: 300px;
                        object-fit: cover;
                        }
                        .card-body {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        padding: 20px;
                        min-height: 250px;
                        }

                        .price-header {
                            padding-bottom: 15px;
                            color: #f50057 ;
                            font-size: 25px;
                            font-weight: bold;
                        }

                        .price-container {
                            padding-bottom: 10px;
                        }

                        .price-status {
                            font-weight: bold;
                            font-size: 20px;
                            color: #303F9F;
                        }

                        .tag {
                        background: #cccccc;
                        border-radius: 50px;
                        font-size: 12px;
                        margin-left: 3px;
                        margin-right: 3px;
                        color: #fff;
                        padding: 2px 10px;
                        text-transform: uppercase;
                        
                        }
                        .tag-teal {
                        background-color: #47bcd4;
                        }
                        .tag-purple {
                        background-color: #5e76bf;
                        }
                        .tag-pink {
                        background-color: #cd5b9f;
                        }

                        .card-body p {
                        font-size: 13px;
                        margin: 0 0 40px;
                        }
                        .user {
                        display: flex;
                        margin-top: auto;
                        }

                        .user img {
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        }
                        .user-info h5 {
                        margin: 0;
                        }
                        .user-info small {
                        color: #545d7a;
                        }

                        .contact-button {
                            background-color:#f50057;
                            border-radius:4px;
                            border: 0;
                            align-self: center;
                            cursor:pointer;
                            color:#ffffff;
                            font-family:Arial;
                            font-size:16px;
                            font-weight:bold;
                            padding:8px 24px;
                            text-decoration:none;
                            
                        }
                        .contact-button:hover {
                            background-color:#eb675e;
                        }
                        .contact-button:active {
                            position:relative;
                            top:1px;
                        }

                        .edit-delete-buttons{
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                        }

                    `}</style>

        </div>


    );
}

const mapStateToProps = (state) => ({
    myProfileDetails: getMyProfileDetails(state),
});

export default connect(mapStateToProps)(WithAuth(UserProfile));