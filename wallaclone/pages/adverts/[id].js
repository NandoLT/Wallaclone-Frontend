import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getAdvertDetail } from '../../api/adverts';
import statusEnum from '../../utils/advertsEnum';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditAdvertForm from '../../components/Advert/EditAdvert';


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
        <div>
            {advert ?
                <div>
                    <img src={advert.photo ?  `${process.env.REACT_APP_API_BASE_URL_DEPLOYED}/images/${advert.photo}` : '/img/image-not-available.png'} />
                    {editMode ? 
                    <div>
                       <EditAdvertForm advert={advert}/>

                    </div>

                    :

                    <div>

                    </div>
                    
                     }
                    {editMode ? <div>MODO EDICION</div> : <div>{advert.name}</div> }
                    {editMode ? <div>MODO EDICIÓN </div> : <div>{advert.description}</div> }
                    {editMode ? <div>MODO EDICIÓN </div> : <div> {advert.price} €</div> }
                    {editMode ? <div>MODO EDICIÓN </div> : <div>{statusEnum[advert.status]}</div>}
                    {editMode ? <div>MODO EDICIÓN </div> : <div>{advert.province}</div>}
                    {editMode ? <div>MODO EDICIÓN </div> :   <ul>
                        {advert.tags.map(tag => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul> }
                   
                  
                </div>

                : ''
            }
            <div>
            <Button onClick={handleEditMode} disabled={false} size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Editar anuncio
                </Button>
            </div>
         

        </div>
    );
}

export default advert