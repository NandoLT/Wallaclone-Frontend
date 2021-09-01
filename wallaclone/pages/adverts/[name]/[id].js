import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { deleteAdvert, getAdvertDetail } from '../../../api/adverts';
import statusEnum from '../../../utils/advertsEnum';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditAdvertForm from '../../../components/Advert/EditAdvert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged } from '../../../store/selectors';
import ConfirmationPopup from '../../../components/ConfirmationPopup';
import Image from 'next/image'
import parseAuthToken from '../../../utils/parseAuthToken'
import { CardMedia } from '@material-ui/core';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { createConversationAction } from '../../../store/actions';


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
    image: {
        height: 350
    }

}));

const Advert = () => {

    const isLogged = useSelector(getIsLogged)


    const classes = useStyles();


    const router = useRouter();
    const { id } = router.query;



    useEffect(() => {
        (async () => {
            if (id) {

                const advert = await getAdvertDetail(id);
                setAdvert(advert);
                setAdvertUserId(advert.userId);

            }
        })()

    }, [id])





    const [advert, setAdvert] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [advertUserId, setAdvertUserId] = useState(null);

    const userId = parseAuthToken();
    const dispatch = useDispatch();







    // CÓDIGO DE EDICIÓN DEL ANUNCIO

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    const handleDeleteAdvert = async () => {

        await deleteAdvert(id);
        router.push('/adverts');

    }

    const handleChat = () => {
        if (!isLogged) {
            router.push('/login');
        }
        const newConversation = {
            conversationId: `${userId}-${advertUserId}-${id}`,
            members: [userId, advertUserId],
            conversation: [],
            productId: id
        }
        
        dispatch(createConversationAction(newConversation));
        router.push('/user/dashboard/messages');
    }

    const adBelongstoUser = () => {
        
        if (userId === advertUserId) {
            return true
        }
    }


    return (
        <div className="register-container">

            {advert ?


                <main>
                    {editMode ?
                        <div>
                            <div><Button onClick={handleEditMode} disabled={false} size="large" className={classes.margin} variant="contained" color="secondary" type="submit">
                                Deshacer cambios
                            </Button></div>
                            <EditAdvertForm productId={id} advert={advert} />


                        </div>
                        :
                        <div className="container">
                            <div className="card">
                                <div className="card-header">
                                    <CardMedia className={classes.image} image={advert.photo ? process.env.REACT_APP_BASE_URL_IMAGES_DIRECTORY + `${advert.userId}/${advert.photo[0]}` : '/img/image-not-available.png'} />
                                </div>
                                <div className="card-body">

                                    <div className="social-icons-container"> 
                                        <span className="social-icon" >
                                        <FacebookShareButton url={window.location.href} quote={advert.name}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton> 

                                        </span>
                                        
                                        <span className="social-icon">
                                        <TwitterShareButton  url={window.location.href} title={advert.name} hashtags={advert.tags}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>

                                        </span>
                                        
                                        <span className="social-icon">
                                        <WhatsappShareButton url={window.location.href}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                        </span>
                                        
                                            
                                    </div>
                                    
                                    
                                    <div className="price-container">{advert.status === 0 && <div className="price-status"> En venta:  <span className="price-header">{advert.price} €</span> </div>}</div>

                                    <div className="price-container">{advert.status === 1 && <div className="price-status"> Ofrezco máximo:  <span className="price-header">{advert.price} €</span> </div>}</div>


                                    <div className="tags-container">{advert.tags.map(tag => {
                                        return <span className="tag tag-teal" key={tag}>{tag}</span>
                                    })} </div>

                                    <h2>
                                        {advert.name}
                                    </h2>
                                    <p>
                                        {advert.description}
                                    </p>
                                    <div className="user">
                                        {/* <Image src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" /> */}
                                        <div className="user-info">
                                            <h5>{advert.province}</h5>

                                        </div>


                                    </div>
                                    <div>
                                        {(adBelongstoUser() && !editMode)

                                            &&

                                            <div className="owner-buttons">
                                                <Button
                                                    onClick={handleEditMode}
                                                    size="medium" className={classes.margin}
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit">
                                                    Editar anuncio
                                                </Button>

                                                <ConfirmationPopup
                                                    className="delete-button"
                                                    buttonText="Borrar anuncio"
                                                    popupTitle="Borrar anuncio"
                                                    popupDescription="¿Seguro que quieres borrar el anuncio?"
                                                    handleConfirmation={handleDeleteAdvert}
                                                />
                                            </div>

                                        }

                                        {(!adBelongstoUser())
                                            &&

                                            <div>


                                                <button
                                                    onClick={handleChat}
                                                    className="contact-button"
                                                >
                                                    Contactar vendedor
                                                </button>
                                            </div>}

                                    </div>
                                </div>
                            </div>


                        </div>


                    }




                </main>


                :
                <div></div>
            }

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

                        .social-icons-container{
                            margin-top: -25px;
                            margin-bottom: 10px;
                        }

                        .social-icon{
                            padding:0 5px;
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

                        .owner-buttons{
                            display: flex;
                            flex-direction:row,
                            justify-content:center
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

export default Advert