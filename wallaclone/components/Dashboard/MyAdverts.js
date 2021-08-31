
import React from 'react'
import { connect } from 'react-redux';
import { getIsLogged, getIsLoading, getError } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import { getMyAdverts } from '../../store/selectors';
import { Box, Button, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AdvertCard from '../../components/Card';



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
    upload: {
        display: 'none',
    },
    fullWidth: {
        width: '100%'
    },
    button: {
        color: '#fff',
        width: 'fit-content'
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

const MyAdverts = ({ isLogged, isLoading, error, myAdverts }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (

        <div className={classes.fullWidth}>
            {!myAdverts.length > 0 ?

                <div className={classes.center}>
                    <h1>Todavía no has creado ningún anuncio, ¿a que esperas?</h1>
                    <Link className={classes.link} href="/create-advert">
                        <Button className={classes.button} variant="contained" color="primary">Subir producto</Button>
                    </Link>
                </div>
                :

                <>

                    <h1>Mis anuncios</h1>

                    <Box pl={1} pr={1}>

                        <Grid container spacing={1} className="adverts">

                            {
                                myAdverts.map(advert => {

                                    return (
                                        <Grid container item xs={12} sm={6} md={4} lg={3} key={advert._id}>

                                            <AdvertCard advert={advert} key={advert._id} />

                                        </Grid>

                                    )
                                })
                            }

                        </Grid>

                    </Box>

                </>
            }


            <style jsx>{`
                    
                    
                    .ads-container{
                      display:flex;
                      justify-content: flex-start;
                      flex-direction: row;
                      align-content: center;
                      flex-wrap: wrap;
                    }

                    h1{
                        text-align:center;
                    }        

                    `}</style>


        </div>




    )
}

const mapStateToProps = state => ({
    isLogged: getIsLogged(state),
    isLoading: getIsLoading(state),
    error: getError(state),
    myAdverts: getMyAdverts(state),
})



export default connect(mapStateToProps)(MyAdverts);


