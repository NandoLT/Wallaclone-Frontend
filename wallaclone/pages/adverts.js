
import React, { useEffect } from 'react'
import Link from 'next/link';
import statusEnum from '../utils/advertsEnum';
import { connect } from 'react-redux';
import { getIsLogged, getAdverts } from '../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction } from '../store/actions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));


const Adverts = ({ isLogged, adverts }) => {
    const classes = useStyles();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(advertsGetAction())
    }, [])



    return (
        <div className="adverts-container">
            <h1>Página de Anuncios</h1>
            <Link href='/'> Go back home

            </Link >
            <section className="adverts-section">

                {adverts.result
                    ?

                    <Grid container spacing={2}>
                        {adverts.result.map(advert => {
                            const { name, price, onSale } = advert;
                            return (

                                <Grid item xs={6} sm={4} md={3} >
                                    <div className='advert-item'>
                                        <h3>{name}</h3>
                                        <p className="advert-price">Precio: {price} €</p>
                                        <div className="tags">
                                            {advert.tags.map(tag => {
                                                return <p className="advert-tag">{tag}</p>
                                            })}
                                        </div>
                                        <p className="advert-status">{statusEnum[advert.status]}</p>
                                    </div>

                                </Grid>



                            )
                        })}
                    </Grid>



                    :
                    <h2> No hay anuncios que mostrar</h2>
                }

            </section>


        </div>
    )
}
const mapStateToProps = state => ({ isLogged: getIsLogged(state), adverts: getAdverts(state) })



export default connect(mapStateToProps)(Adverts)
