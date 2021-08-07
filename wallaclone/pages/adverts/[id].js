import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import statusEnum from '../../utils/advertsEnum';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditAdvertForm from '../../components/Advert/EditAdvert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from '../../styles/Home.module.css'


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

   

    const classes = useStyles();


    const router = useRouter();
    const { id } = router.query;
    const [advert, setAdvert] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        (async () => {
            if (id) {
                const advert = await getAdvertDetail(id);
                setAdvert(advert);
            }
        })()

    }, [id])

// CÓDIGO DE EDICIÓN DEL ANUNCIO

const handleEditMode= () => {
    setEditMode(!editMode);
}

   


    return (
        <div className="register-container">
            {advert ?
                <div >
                    <img src={advert.photo ?  `${process.env.REACT_APP_API_BASE_URL_DEPLOYED}/images/${advert.photo}` : '/img/image-not-available.png'} />
                    {editMode && <div className= "pointer" onClick={() => console.log("Borrar Imagen")}> <DeleteForeverIcon onClick={()=> console.log("Borrar imagen")} color="secondary" fontsize="large"/> Borrar Imagen</div> }
                    {editMode && <div><Button  onClick={handleEditMode} disabled={false} size="large" className={classes.margin} variant="contained" color="secondary" type="submit">
                    Deshacer cambios
                </Button></div>}
                    {editMode ? 
                    <div>
                       <EditAdvertForm advert={advert}/>
                       

                    </div>

                    :

                    <div>
                        <div>{advert.name}</div> 
                        <div>{advert.description}</div> 
                   <div> {advert.price} €</div> 
                    <div>{statusEnum[advert.status]}</div>
                    <div>{advert.province}</div>
                    <ul>
                        {advert.tags.map(tag => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul> 

                    </div>
                    
                     }
                    
                   
                   
                  
                </div>

                : ''
            }
            <div>
                {!editMode &&  <Button onClick={handleEditMode} disabled={false} size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Editar anuncio
                </Button> 
                
                }
           
            </div>
         

        </div>
    );
}

export default advert