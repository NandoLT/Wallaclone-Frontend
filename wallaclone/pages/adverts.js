
import React from 'react'
import Link from 'next/link';
import { connect } from 'react-redux';
import { getIsLogged, getAdverts } from '../store/selectors';

const fakeAdverts = [
    {
        name: "Anuncio 1",
        price: 45.67,
        onSale: true,
    },
    {
        name: "Anuncio 2",
        price: 85.63,
        onSale: false,
    },
    {
        name: "Anuncio 3",
        price: 4.17,
        onSale: true,
    },
]

const Adverts = ({ isLogged, adverts }) => {


    return (
        <div className="main-container">
            <h1>Página de Anuncios</h1>
            <Link href='/'> Go back home

            </Link >

            {isLogged
                ?
                <section className="ads-container">

                    {fakeAdverts.map(advert => {
                        const { name, price, onSale } = advert;
                        return (

                            <div className="ad-wrapper">
                                <h3>{name}</h3>
                                <p>Precio: {price} €</p>
                                {advert ? <p>En venta</p> : <p>Compro</p>}
                            </div>



                        )
                    })}


                </section>
                :
                <h2> Usuario no loggeado, no te muestro anuncios</h2>
            }




            <style jsx>{`
            
            h1{
                color:red;
            }

            .main-container{
                text-align:center;
                margin: 5rem;
            }

            .ad-wrapper{
                max-width: 200px;
                min-width: 200px;
                max-height: 200px;
                min-height: 200px;
                padding-top: 20px;
                padding-bottom: 20px;
                padding-left: 30px;
                padding-right:30px;
                margin:10px;
                border-width: 1px;
                border-radius: 5px;
                border-style: solid;
                border-color: lightslategray;
            }

            .ads-container{
                margin: 50px;
                margin-top:30px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                
            }

            `}</style>


        </div>
    )
}
const mapStateToProps = state => ({ isLogged: getIsLogged(state), adverts: getAdverts(state) })

export default connect(mapStateToProps)(Adverts)
