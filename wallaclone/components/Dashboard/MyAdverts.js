
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction, fetchMyAdvertsAction } from '../../store/actions';
import { getMyAdverts } from '../../store/selectors';
import { Box, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SimplifiedAdvertCard from '../Advert/SimplifiedAdvertCard';
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
    }
}));

const MyAdverts = ({ isLogged, isLoading, error, myAdverts }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (

        <div className={classes.fullWidth}>
            {!myAdverts.length > 0 ?

                <h1>Todavía no has publicado anuncios, vago</h1>
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


