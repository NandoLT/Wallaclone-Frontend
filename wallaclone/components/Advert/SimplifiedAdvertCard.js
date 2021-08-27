import React from 'react';
import Link from 'next/link';


const SimplifiedAdvertCard = ({advert}) => {

    const {photo, tags, name, description, price, province, status, _id} = advert;
    return (
        <div className="container">
                                <div className="card">
                                    <div className="card-header">
                      
                                        <img  src={photo.length >0 ?  `https://pruebas-wallaclone.s3.eu-west-3.amazonaws.com/${advert.userId}/${photo[0]}` : '/img/image-not-available.png'} />
                      
                                    </div>
                                    <div className="card-body">
                        
                                        {status === 0 && <div className="price-container"> <div className="price-status"> En venta:  <span className="price-header">{price} €</span> </div> </div>}

                                        {status === 1 && <div className="price-container"> <div className="price-status"> Ofrezco hasta:  <span className="price-header">{price} €</span> </div>  </div>}
                    

                                    <div className="tags-container"> </div>
                                        
                                        <h2> {name} </h2>
                                        <p> {description} </p>
                        

                                    <div className="button-container">
                                        <Link href={`/adverts/${_id}`} passHref>
                    
                                           <button
                                           //onClick={handleChat}
                                           className="edit-button"
                                           >
                                               Ver anuncio
                                           </button> 
                                           </Link>
                                           
                                           </div> 
                                    </div>
                            </div>
                            <style jsx>{`
                    
                    
                    

                    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
                        * {
                        box-sizing: border-box;
                        }

                        

                        .card {
                        margin: 10px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
                        overflow: hidden;
                        width: 300px;
                        
                        }
                        .card-header img {
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                        }
                        .card-body {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        padding: 20px;
                        min-height: 250px;
                        }

                        .price-header {
                            padding-bottom: 15px;
                            color: #f50057 ;
                            font-size: 25px;
                            font-weight: bold;
                        }

                        .price-container {
                            padding-bottom: 10px;
                        }

                        .price-status {
                            font-weight: bold;
                            font-size: 20px;
                            color: #303F9F;
                        }

                        .tag {
                        background: #cccccc;
                        border-radius: 50px;
                        font-size: 12px;
                        margin-left: 3px;
                        margin-right: 3px;
                        color: #fff;
                        padding: 2px 10px;
                        text-transform: uppercase;
                        
                        }
                        .tag-teal {
                        background-color: #47bcd4;
                        }
                        .tag-purple {
                        background-color: #5e76bf;
                        }
                        .tag-pink {
                        background-color: #cd5b9f;
                        }

                        .card-body p {
                        font-size: 13px;
                        margin: 0 0 40px;
                        }
                        .user {
                        display: flex;
                        margin-top: auto;
                        }

                        .user img {
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        }
                        .user-info h5 {
                        margin: 0;
                        }
                        .user-info small {
                        color: #545d7a;
                        }

                        .button-container{
                            display:flex;
                            flex-direction: row;
                            justify-content: center;


                        }

                        .edit-button {
                            background-color:#f50057;
                            
                            border-radius:4px;
                            border: 0;
                            align-self: center;
                            cursor:pointer;
                            color:#ffffff;
                            font-family:Arial;
                            font-size:14px;
                            font-weight:bold;
                            padding:8px 24px;
                            text-decoration:none;
                            margin-right: 10px;
                            
                        }
                        .edit-button:hover {
                            background-color:#eb675e;
                        }
                        .edit-button:active {
                            position:relative;
                            top:1px;
                        }

        

                    `}</style>
                    
                    </div>  
    )
}

export default SimplifiedAdvertCard
