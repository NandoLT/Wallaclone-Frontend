
import React, { useEffect, useState } from 'react'


import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction } from '../../store/actions';
import { getMyAdverts } from '../../api/adverts';

const MyAdverts = () => {

    const [myAdverts, setMyAdverts] = useState(null);

    const fetchMyAdverts = async () => {
        try {
            const myAdvertsFetched = getMyAdverts()
            return myAdvertsFetched
            
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        const myOwnAdverts= fetchMyAdverts()
        setMyAdverts(myOwnAdverts);
        
    }, [])

    return (
        <div>

            <h1>MIS ANUNCIOS</h1>
            
        </div>
    )
}

export default MyAdverts
