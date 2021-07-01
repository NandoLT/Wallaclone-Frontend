
import React from 'react'
import Link from 'next/link';

const Adverts = () => {
    return (
        <div className="main-container">
            <h1>Página de Anuncios</h1>
            <Link href='/'> Go back home
            
             </Link >
            <style jsx>{`
            
            h1{
                color:red;
            }

            .main-container{
                text-align:center;
                margin: 5rem;
            }

            `}</style>
        </div>
    )
}

export default Adverts
