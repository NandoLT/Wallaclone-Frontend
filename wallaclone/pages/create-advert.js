
import React, { useEffect } from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import { getIsLogged, getIsLoading, getError } from '../store/selectors';
import Alert from '../components/Alert';
import styles from '../styles/Home.module.css';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch } from 'react-redux';
import { advertCreationAction, authResetState } from '../store/actions';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(3),
      },
      tagError:{
          color:red,
      },
      upload: {
        display: 'none',
      },
}));



const CreateNewAd = ({ isLogged, isLoading, error }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authResetState())
        
    }, [])
    
    const classes = useStyles();

    const [adDetails, setAdDetails] = React.useState({
        name: '',
        description: '',
        price: '',
        tags:[],
        statusEnum: 0,
        photo:null,
    })

    const setPhoto = event => {
        console.log(event.target.files[0])
        setAdDetails(oldAdDetails => {
            const newAdDetails = {
                ...oldAdDetails,
                'photo': event.target.files[0]
            }
            return newAdDetails;
        });
    }

    const handleChangeCheck = ev => {
        const clickedTag = ev.target.name
        setAdDetails(oldAdDetails => {
            const newTags = oldAdDetails.tags;

            if (newTags.includes(clickedTag)) {
                newTags.splice(newTags.indexOf(clickedTag), 1);
            } else {
                newTags.push(clickedTag);
            }

            const newAdDetails = {
                ...oldAdDetails,
                'tags': newTags
            }
            return newAdDetails;
        }
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(advertCreationAction(adDetails));

    }
    

    const handleInputChange = event => {
        setAdDetails(oldAdDetails => {

            const newAdDetails = {
                ...oldAdDetails,
                [event.target.name]: event.target.value,
            }
            return newAdDetails
        });

    }

    const validation = () => {
        if(!adDetails.name){
            return true
        };
        if(!adDetails.description){
            return true
        };
        if(!adDetails.price){
            return true
        };

        if(adDetails.tags.length < 1){
            return true
        }


        return false
    }


    return (
        <div className="register-container">
            <h1>Publica un nuevo anuncio</h1>

            <form onSubmit={handleSubmit} className="register-form">
            
   
                <div>
                    <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            
                            <Grid item>
                                <TextField required onChange={event => handleInputChange(event)} name="name" id="input-with-icon-grid" label="Nombre del producto" value={adDetails.name} />
                            </Grid>
                        </Grid>
                    </div>
                
                </div>

                <div>

                <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            
                            <Grid item>
                                <TextField  required multiline rows={4} onChange={handleInputChange} name="description" id="input-with-icon-grid" label="Descripción del producto" value={adDetails.description} />
                            </Grid>
                        </Grid>
                    </div>
                    </div>
        
               
                <div>
                <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                           
                            <Grid item>
                                <TextField required onChange={event => handleInputChange(event)} name="price" id="input-with-icon-grid" label="Precio" value={adDetails.price} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                
                <div>
                    
                </div>

              
                <FormControl style={{ margin: 8 }}  className={classes.margin}>
                <Select style={{ margin: 8 }} required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={adDetails.statusEnum}
                    onChange={handleInputChange}
                    name= "statusEnum"
                    >
                        <MenuItem value={0}>Vendo</MenuItem>
                        <MenuItem value={1}>Compro</MenuItem>
                        
                    </Select>
                </FormControl>
                <InputLabel id="demo-simple-select-label">¿Vendes o compras?</InputLabel>

                <FormControl  component="fieldset" className={classes.formControl}>
                    <FormLabel style={{ margin: 8 }} component="legend">Elige al menos una categoría</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox 
                            checked={adDetails.tags.includes("tecnologia")} 
                            onChange={handleChangeCheck} 
                            name="tecnologia" />}
                            label="Tecnologia"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={adDetails.tags.includes("movil")}  onChange={handleChangeCheck} name="movil" />}
                            label="Movil"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={adDetails.tags.includes("deporte")} onChange={handleChangeCheck} name="deporte" />}
                            label="Deporte"
                        />
                    </FormGroup>
                   
            </FormControl >
                    <div  className={classes.root}>
                    <input
                    className={classes.upload}
                    onChange={setPhoto}
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label  htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                    Subir foto
                    </Button>
                    <label htmlFor="contained-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
      </label>
                </label>
                </div>
                  
                {error && <Alert />}

                {!isLoading && <Button disabled={validation()} size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Publicar anuncio
                </Button>}
                {error && <Alert />}


            </form>
            {isLoading && <Loading />}
            {error && <Alert/>}
            <Link className={styles.card} href='/' passHref>
                <div className={styles.card} >
                    <h3>  Go Back Home &rarr;  </h3>
                </div>
            </Link>

        </div>
    )
}



const mapStateToProps = (state) => ({
    isLogged: getIsLogged(state),
    isLoading: getIsLoading(state),
    error: getError(state),
}); // Para poder conectar el componente al estado de redux

// const mapDispatchToProps = (dispatch) => ({
//     onLogin: () => dispatch(authLoginAction()),
//     onLogout: () => dispatch(authLogout())
// }); //Para poder conectar el componente al dispatch de redux

export default connect(mapStateToProps)(CreateNewAd)
