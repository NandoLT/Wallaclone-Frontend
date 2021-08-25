
import React, { useEffect, useState } from 'react'


import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction, fetchMyAdvertsAction } from '../../store/actions';
import { getMyAdverts } from '../../store/selectors';

const MyAdverts = ({isLogged, isLoading, error, myAdverts}) => {

    const dispatch = useDispatch();

   useEffect( () => {
       dispatch(fetchMyAdvertsAction());
       
   }, [])

    return (

        <div>

            <h1> Mis anuncios</h1>

            <div className="ads-container">

                <h3>HOLA</h3>
                <h3>HOLA</h3>
                <h3>HOLA</h3>

            </div>

            <style jsx>{`
                    
                    
                    .ads-container{
                      display:flex;
                      justify-content: center;
                      flex-direction: row;
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


