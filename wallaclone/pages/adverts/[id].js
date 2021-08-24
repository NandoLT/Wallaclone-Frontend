import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { deleteAdvert, getAdvertDetail } from '../../api/adverts';
import statusEnum from '../../utils/advertsEnum';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditAdvertForm from '../../components/Advert/EditAdvert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from '../../styles/Home.module.css'
import { useSelector } from 'react-redux';
import { getIsLogged, getUserId } from '../../store/selectors';



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

const advert = () => {

    const isLogged = useSelector(getIsLogged)

    
    const classes = useStyles();


    const router = useRouter();
    const { id } = router.query;
    const [advert, setAdvert] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [advertUserId, setAdvertUserId] = useState(null);
    const userId = useSelector(getUserId)
    

    useEffect(() => {
        (async () => {
            if (id) {
                const advert = await getAdvertDetail(id);
                setAdvert(advert);
                setAdvertUserId(advert.userId);
                
            }
        })()

    }, [id])

// CÓDIGO DE EDICIÓN DEL ANUNCIO

const handleEditMode= () => {
    setEditMode(!editMode);
}

const handleDeleteAdvert = async ()=> {
    
    await deleteAdvert(id);
    router.push('/adverts');

}

const handleChat = () =>{
    if(!isLogged){
        router.push('/login');
    }
    console.log('Iniciando chat')
}

const adBelongstoUser = () => {
    if (userId === advertUserId){
        return true
    }
}


    return (
        <div className="register-container">
            
            {advert ?
   

    <main>  
         {editMode ?
                <div>
                       <EditAdvertForm productId={id} advert={advert}/>

                    </div>
                    :
                    <div className="container">
                    <div className="card">
                      <div className="card-header">
                      <img  src={advert.photo ?  `https://pruebas-wallaclone.s3.eu-west-3.amazonaws.com/${advert.userId}/${advert.photo[0]}` : '/img/image-not-available.png'} />
                      </div>
                      <div className="card-body">
                      <div className="price-header">{advert.price} €</div>
                                            {advert.tags.map(tag => {
                                                return <span className="tag tag-teal" key={tag}>{tag}</span>
                                            })}
                                        
                        <h2>
                          {advert.name}
                        </h2>
                        <p>
                          {advert.description}
                        </p>
                        <div className="user">
                          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                          <div className="user-info">
                            <h5>{advert.province}</h5>
                            
                          </div>
                          
                    
                        </div>
                        <div>
                                    {(adBelongstoUser() && !editMode) 
                                    
                                    &&
                                    
                                        <div> 
                                            <Button 
                                            onClick={handleEditMode}  
                                            size="large" className={classes.margin} 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit">
                                                Editar anuncio
                                            </Button> 
                    
                                            <Button 
                                            onClick={handleDeleteAdvert}  
                                            size="large" 
                                            className={classes.margin} 
                                            variant="contained" 
                                            color="secondary" 
                                            type="submit">
                                                Borrar anuncio
                                            </Button>  </div>  
                    
                                    }
                    
                                    { (!adBelongstoUser())
                                        &&
                    
                                      <div>
                                           
                    
                                            <button
                                            onClick={handleChat}
                                            className="contact-button"
                                            >
                                                Contactar vendedor
                                            </button> 
                                            </div> }
                               
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
                            font-size: 20px;
                            font-weight: bold;
                        }

                        .tag {
                        background: #cccccc;
                        border-radius: 50px;
                        font-size: 12px;
                        margin: 0;
                        color: #fff;
                        padding: 2px 10px;
                        text-transform: uppercase;
                        cursor: pointer;
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

                    `}</style>

        </div>
        
        
    );
}

export default advert