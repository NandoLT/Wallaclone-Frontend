import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError, getFavoritesAdverts, getMyFavoriteAdverts } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction, fetchMyAdvertsAction } from '../../store/actions';
import { getMyAdverts } from '../../store/selectors';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SimplifiedAdvertCard from '../Advert/SimplifiedAdvertCard';
import { getMyFavoriteAdvertsAction } from '../../store/actions';
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
}));

const MyfavoriteAds = ({ isLogged, isLoading, error, myFavoriteAdverts }) => {
    const classes = useStyles();
    const dispatch = useDispatch();



    useEffect(() => {
        async function fetch() {
            await dispatch(getMyFavoriteAdvertsAction());
        }
        fetch();
    }, [])

    return (

        <div>

            {!myFavoriteAdverts.length > 0 ?

                <h1>Todavía no has seleccionado anuncios favoritos, vago</h1>
                :

                <>

                    <h1>Mis favoritos</h1>

                    <div className="ads-container">

                        {
                            myFavoriteAdverts.map(advert => {
                                

                                return (
                                    <AdvertCard advert={advert} key={advert._id}  />
                                

                                )
                            })
                        }




                    </div>
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
    myFavoriteAdverts: getMyFavoriteAdverts(state),
})



export default connect(mapStateToProps)(MyfavoriteAds);