import React, { useEffect } from 'react'
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Loading from '/components/Loading';
import { getIsLogged, getIsLoading, getError, getUserId } from '../../store/selectors';
import Alert from '/components/Alert';
import styles from '../../styles/Home.module.css';
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
import { advertCreationAction, authResetState } from '../../store/actions';
import provinces from '../../utils/spainProvinces';
import WithAuth from '/components/hocs/WithAuth';


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

const EditAdvertForm = ({advert, isLogged, isLoading, error, userId}) => {

  const [newAdDetails, setNewAdDetails] = React.useState({
    name: advert.name,
    description: advert.description,
    price: advert.price,
    province:advert.province,
    tags:[],
    status: advert.status,
    photo:advert.photo,
    //userId:userId,
})

  const classes = useStyles();

  const handleInputChange = event => {
    setNewAdDetails(oldAdDetails => {

        const newAdDetails = {
            ...oldAdDetails,
            [event.target.name]: event.target.value,
        }
        return newAdDetails
    });

}

const handleChangeCheck = ev => {
  const clickedTag = ev.target.name
  setNewAdDetails(oldAdDetails => {
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

const setPhoto = event => {
  setNewAdDetails(oldAdDetails => {
      const newAdDetails = {
          ...oldAdDetails,
          'photo': event.target.files[0]
      }
      return newAdDetails;
  });
}

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newAdDetails)
    // const formData = new FormData();

    //     formData.append('name', adDetails.name);
    //     formData.append('description', adDetails.description);
    //     formData.append('price', adDetails.price);
    //     formData.append('province', adDetails.province);
    //     formData.append('tags', adDetails.tags);
    //     formData.append('status', adDetails.status);
    //     formData.append('userId', adDetails.userId);
    //     if (adDetails.photo) {
    //         formData.append('photo', adDetails.photo);
    //     }

        
    // dispatch(advertCreationAction(formData));

}

const validation = () => {
  if(!newAdDetails.name){
      return true
  };
  if(!newAdDetails.description){
      return true
  };
  if(!newAdDetails.price || newAdDetails.price <=0 || newAdDetails.price >100000 || isNaN(newAdDetails.price) ){
      return true
  };

  if(!newAdDetails.province){
      return true
  };

  if(newAdDetails.tags.length < 1){
      return true
  }


  return false
}

  return (
    <div >
      <form onSubmit={handleSubmit} className="register-form">
            
   
            <div>
                <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        
                        <Grid item>
                            <TextField required onChange={event => handleInputChange(event)} name="name" id="input-with-icon-grid" label="Nombre del producto" value={newAdDetails.name} />
                        </Grid>
                    </Grid>
                </div>
            
            </div>

            <div>

            <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        
                        <Grid item>
                            <TextField  required multiline rows={4} onChange={handleInputChange} name="description" id="input-with-icon-grid" label="Descripción del producto" value={newAdDetails.description} />
                        </Grid>
                    </Grid>
                </div>
                </div>
    
           
            <div>
            <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                       
                        <Grid item>
                            <TextField required onChange={event => handleInputChange(event)} name="price" id="input-with-icon-grid" label="Precio" value={newAdDetails.price} />
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
                value={newAdDetails.status}
                onChange={handleInputChange}
                name= "statusEnum"
                >
                    <MenuItem value={0}>Vendo</MenuItem>
                    <MenuItem value={1}>Compro</MenuItem>
                    
                </Select>
            </FormControl>
            <InputLabel id="demo-simple-select-label">¿Vendes o compras?</InputLabel>

            <FormControl style={{ margin: 8 }}  className={classes.margin}>
            <Select style={{ margin: 8 }} required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newAdDetails.province}
                onChange={handleInputChange}
                name= "province"
                >
                    {provinces.map(province => <MenuItem value={province.nombre}>{province.nombre}</MenuItem> )}
                    
                    
                </Select>
            </FormControl>
            <InputLabel id="demo-simple-select-label">Provincia</InputLabel>

            <FormControl  component="fieldset" className={classes.formControl}>
                <FormLabel style={{ margin: 8 }} component="legend">Elige al menos una categoría</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox 
                        checked={newAdDetails.tags.includes("tecnologia")} 
                        onChange={handleChangeCheck} 
                        name="tecnologia" />}
                        label="Tecnologia"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={newAdDetails.tags.includes("movil")}  onChange={handleChangeCheck} name="movil" />}
                        label="Movil"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={newAdDetails.tags.includes("deporte")} onChange={handleChangeCheck} name="deporte" />}
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

            {!isLoading && <Button disabled={validation()} size="large" className={classes.margin} variant="contained" color="secondary" type="submit">
                Modificar anuncio
            </Button>}
            {error && <Alert />}


        </form>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLogged: getIsLogged(state),
  isLoading: getIsLoading(state),
  error: getError(state),
  userId: getUserId(state),
}); 

export default connect(mapStateToProps)(WithAuth(EditAdvertForm))



