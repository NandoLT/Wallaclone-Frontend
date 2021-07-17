
import React, { useEffect } from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { authRegisterAction, authResetState } from '../store/actions';
import { useDispatch, connect } from 'react-redux';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { red } from '@material-ui/core/colors';


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
      }
}));



const CreateNewAd = ({ isLogged, isLoading, error }) => {

    
    const classes = useStyles();

    const [tags, setTags] = React.useState({
        tecnologia: false,
        movil: false,
        deporte: false,
      });
    
    const {tecnologia, movil, deporte} = tags;
    
    const tagsError = [tecnologia, movil, deporte].filter((v) => v).length < 1;

    const [adDetails, setAdDetails] = React.useState({
        name: '',
        description: '',
        price: '',
        onSale: true,
        photo:null,
    })

    const handleSubmit = (event) => {
        console.log(adDetails)
        console.log(tags);
        event.preventDefault();
        //dispatch(authRegisterAction(credentials))

    }



    const handleTagsInput = (event) => {
        setTags({ ...tags, [event.target.name]: event.target.checked });
       return tags;
    
      };
    


    const handleInputChange = event => {
        setAdDetails(oldAdDetails => {

            const newAdDetails = {
                ...oldAdDetails,
                [event.target.name]: event.target.value,
            }
            return newAdDetails
        });

    }


    return (
        <div className="register-container">
            <h1>Publica un nuevo anuncio</h1>

            <form onSubmit={handleSubmit} className="register-form">
            
   
                <div>
                    <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            
                            <Grid item>
                                <TextField  onChange={event => handleInputChange(event)} name="name" id="input-with-icon-grid" label="Nombre del producto" value={adDetails.name} />
                            </Grid>
                        </Grid>
                    </div>
                
                </div>

                <div>

                <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                            
                            <Grid item>
                                <TextField multiline rows={4} onChange={handleInputChange} name="description" id="input-with-icon-grid" label="Descripción del producto" value={adDetails.description} />
                            </Grid>
                        </Grid>
                    </div>
                    </div>
        
               
                <div>
                <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                           
                            <Grid item>
                                <TextField onChange={event => handleInputChange(event)} name="price" id="input-with-icon-grid" label="Precio" value={adDetails.price} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                
                <div>
                    
                </div>

                <div>
                <div className={classes.margin, "register-input"}>
                        <Grid container spacing={1} alignItems="flex-end">
                           
                            <Grid item>
                                <TextField onChange={handleInputChange} name="password" id="input-with-icon-grid" label="Tags" type="password" value={adDetails.tags} />
                            </Grid>
                        </Grid>
                    </div>
                
                  
                  
                </div>
                <FormControl required error={tagsError} className={classes.margin}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={adDetails.onSale}
                    onChange={handleInputChange}
                    name= "onSale"
                    >
                        <MenuItem value={true}>Vendo</MenuItem>
                        <MenuItem value={false}>Compro</MenuItem>
                        
                    </Select>
                </FormControl>
                <InputLabel id="demo-simple-select-label">¿Vendes o compras?</InputLabel>

                <FormControl  component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Elige al menos una categoría</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={tags.tecnologia} onChange={handleTagsInput} name="tecnologia" />}
                            label="Tecnologia"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={tags.movil} onChange={handleTagsInput} name="movil" />}
                            label="Movil"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={tags.deporte} onChange={handleTagsInput} name="deporte" />}
                            label="Deporte"
                        />
                    </FormGroup>
                    <FormHelperText>{tagsError && <p className={classes.tagError}>No has elegido ninguna categoría</p>}</FormHelperText>
            </FormControl>
                  


                {!isLoading && <Button size="large" className={classes.margin} variant="contained" color="primary" type="submit">
                    Publicar anuncio
                </Button>}
                {error && <Alert />}


            </form>
            {isLoading && <Loading />}
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
