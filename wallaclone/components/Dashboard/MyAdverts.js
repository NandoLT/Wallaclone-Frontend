
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getIsLogged, getAdverts, getIsLoading, getError } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertsGetAction, fetchMyAdvertsAction } from '../../store/actions';
import { getMyAdverts } from '../../store/selectors';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';



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

const MyAdverts = ({isLogged, isLoading, error, myAdverts}) => {
    const classes= useStyles();
    const dispatch = useDispatch();

    

   useEffect( async () => {
       await dispatch(fetchMyAdvertsAction());
       console.log(myAdverts);
       
   }, [])

    return (

        <div>

            <h1> Mis anuncios</h1>

            <div className="ads-container">

            <div className="container">
                    <div className="card">
                      <div className="card-header">
                      <img  src="https://www.newsbtc.com/wp-content/uploads/2020/06/mesut-kaya-LcCdl__-kO0-unsplash-scaled.jpg"  />
                      </div>
                      <div className="card-body">
                          
                     
                      <div className="price-container"> <div className="price-status"> En venta:  <span className="price-header">65 €</span> </div> </div>

                      {/* <div className="price-container">{advert.status === 1 && <div className="price-status"> Ofrezco máximo:  <span className="price-header">{advert.price} €</span> </div> }</div> */}

                      
                                            {/* <div className="tags-container">{advert.tags.map(tag => {
                                                return <span className="tag tag-teal" key={tag}>{tag}</span>
                                            })} </div> */}

                        <div className="tags-container"> </div>
                                        
                        <h2>
                          Globos aerostaticos
                        </h2>
                        <p>
                          Los mejores globos aerostaticos para pasar un buen rato en las alturas haciendo el memo
                        </p>
                        {/* <div className="user">
                          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                          <div className="user-info">
                            <h5>Madrid</h5>
                            
                          </div>
                          
                    
                        </div> */}
                        {/* <div>
                                    
                                    
                                        <div> 
                                            <Button 
                                            // onClick={handleEditMode}  
                                            size="large" className={classes.margin} 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit">
                                                Editar anuncio
                                            </Button> 
                    
                                            <Button 
                                            //onClick={handleDeleteAdvert}  
                                            size="large" 
                                            className={classes.margin} 
                                            variant="contained" 
                                            color="secondary" 
                                            type="submit">
                                                Borrar anuncio
                                            </Button>  </div>  
                
                               
                                            </div>  */}

                                        <div className="button-container">
                                           
                                        <Link href={`/adverts`} passHref>
                                        <button
                                           
                                           className="edit-button"
                                           >
                                               Ver anuncio
                                           </button> 


                                            </Link>
                    
                                          
                                           
                                           </div> 
                      </div>
                    </div>
                    
                    
                    </div>

                    <div className="container">
                    <div className="card">
                      <div className="card-header">
                      <img  src="https://www.newsbtc.com/wp-content/uploads/2020/06/mesut-kaya-LcCdl__-kO0-unsplash-scaled.jpg"  />
                      </div>
                      <div className="card-body">
                          
                     
                      <div className="price-container"> <div className="price-status"> En venta:  <span className="price-header">65 €</span> </div> </div>

                      {/* <div className="price-container">{advert.status === 1 && <div className="price-status"> Ofrezco máximo:  <span className="price-header">{advert.price} €</span> </div> }</div> */}

                      
                                            {/* <div className="tags-container">{advert.tags.map(tag => {
                                                return <span className="tag tag-teal" key={tag}>{tag}</span>
                                            })} </div> */}

                        <div className="tags-container"> </div>
                                        
                        <h2>
                          Globos aerostaticos
                        </h2>
                        <p>
                          Los mejores globos aerostaticos para pasar un buen rato en las alturas haciendo el memo
                        </p>
                        {/* <div className="user">
                          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                          <div className="user-info">
                            <h5>Madrid</h5>
                            
                          </div>
                          
                    
                        </div> */}
                        {/* <div>
                                    
                                    
                                        <div> 
                                            <Button 
                                            // onClick={handleEditMode}  
                                            size="large" className={classes.margin} 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit">
                                                Editar anuncio
                                            </Button> 
                    
                                            <Button 
                                            //onClick={handleDeleteAdvert}  
                                            size="large" 
                                            className={classes.margin} 
                                            variant="contained" 
                                            color="secondary" 
                                            type="submit">
                                                Borrar anuncio
                                            </Button>  </div>  
                
                               
                                            </div>  */}

                                        <div className="button-container">
                                           
                    
                                           <button
                                           //onClick={handleChat}
                                           className="edit-button"
                                           >
                                               Ver anuncio
                                           </button> 
                                           
                                           </div> 
                      </div>
                    </div>
                    
                    
                    </div>

                    <div className="container">
                    <div className="card">
                      <div className="card-header">
                      <img  src="https://www.newsbtc.com/wp-content/uploads/2020/06/mesut-kaya-LcCdl__-kO0-unsplash-scaled.jpg"  />
                      </div>
                      <div className="card-body">
                          
                     
                      <div className="price-container"> <div className="price-status"> En venta:  <span className="price-header">65 €</span> </div> </div>

                      {/* <div className="price-container">{advert.status === 1 && <div className="price-status"> Ofrezco máximo:  <span className="price-header">{advert.price} €</span> </div> }</div> */}

                      
                                            {/* <div className="tags-container">{advert.tags.map(tag => {
                                                return <span className="tag tag-teal" key={tag}>{tag}</span>
                                            })} </div> */}

                        <div className="tags-container"> </div>
                                        
                        <h2>
                          Globos aerostaticos
                        </h2>
                        <p>
                          Los mejores globos aerostaticos para pasar un buen rato en las alturas haciendo el memo
                        </p>
                        {/* <div className="user">
                          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                          <div className="user-info">
                            <h5>Madrid</h5>
                            
                          </div>
                          
                    
                        </div> */}
                        {/* <div>
                                    
                                    
                                        <div> 
                                            <Button 
                                            // onClick={handleEditMode}  
                                            size="large" className={classes.margin} 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit">
                                                Editar anuncio
                                            </Button> 
                    
                                            <Button 
                                            //onClick={handleDeleteAdvert}  
                                            size="large" 
                                            className={classes.margin} 
                                            variant="contained" 
                                            color="secondary" 
                                            type="submit">
                                                Borrar anuncio
                                            </Button>  </div>  
                
                               
                                            </div>  */}

                                        <div className="button-container">
                                           
                    
                                           <button
                                           //onClick={handleChat}
                                           className="edit-button"
                                           >
                                               Ver anuncio
                                           </button> 
                                           
                                           </div> 
                      </div>
                    </div>
                    
                    
                    </div>

                    <div className="container">
                    <div className="card">
                      <div className="card-header">
                      <img  src="https://www.newsbtc.com/wp-content/uploads/2020/06/mesut-kaya-LcCdl__-kO0-unsplash-scaled.jpg"  />
                      </div>
                      <div className="card-body">
                          
                     
                      <div className="price-container"> <div className="price-status"> En venta:  <span className="price-header">65 €</span> </div> </div>

                      {/* <div className="price-container">{advert.status === 1 && <div className="price-status"> Ofrezco máximo:  <span className="price-header">{advert.price} €</span> </div> }</div> */}

                      
                                            {/* <div className="tags-container">{advert.tags.map(tag => {
                                                return <span className="tag tag-teal" key={tag}>{tag}</span>
                                            })} </div> */}

                        <div className="tags-container"> </div>
                                        
                        <h2>
                          Globos aerostaticos
                        </h2>
                        <p>
                          Los mejores globos aerostaticos para pasar un buen rato en las alturas haciendo el memo
                        </p>
                        {/* <div className="user">
                          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                          <div className="user-info">
                            <h5>Madrid</h5>
                            
                          </div>
                          
                    
                        </div> */}
                        {/* <div>
                                    
                                    
                                        <div> 
                                            <Button 
                                            // onClick={handleEditMode}  
                                            size="large" className={classes.margin} 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit">
                                                Editar anuncio
                                            </Button> 
                    
                                            <Button 
                                            //onClick={handleDeleteAdvert}  
                                            size="large" 
                                            className={classes.margin} 
                                            variant="contained" 
                                            color="secondary" 
                                            type="submit">
                                                Borrar anuncio
                                            </Button>  </div>  
                
                               
                                            </div>  */}

                                        <div className="button-container">
                                           
                    
                                           <button
                                           //onClick={handleChat}
                                           className="edit-button"
                                           >
                                               Ver anuncio
                                           </button> 
                                           
                                           </div> 
                      </div>
                    </div>
                    
                    
                    </div>
            
            <div className="container">
                    <div className="card">
                      <div className="card-header">
                      <img  src="https://www.newsbtc.com/wp-content/uploads/2020/06/mesut-kaya-LcCdl__-kO0-unsplash-scaled.jpg"  />
                      </div>
                      <div className="card-body">
                          
                     
                      <div className="price-container"> <div className="price-status"> En venta:  <span className="price-header">65 €</span> </div> </div>

                      {/* <div className="price-container">{advert.status === 1 && <div className="price-status"> Ofrezco máximo:  <span className="price-header">{advert.price} €</span> </div> }</div> */}

                      
                                            {/* <div className="tags-container">{advert.tags.map(tag => {
                                                return <span className="tag tag-teal" key={tag}>{tag}</span>
                                            })} </div> */}

                        <div className="tags-container"> </div>
                                        
                        <h2>
                          Globos aerostaticos
                        </h2>
                        <p>
                          Los mejores globos aerostaticos para pasar un buen rato en las alturas haciendo el memo
                        </p>
                        {/* <div className="user">
                          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                          <div className="user-info">
                            <h5>Madrid</h5>
                            
                          </div>
                          
                    
                        </div> */}
                        {/* <div>
                                    
                                    
                                        <div> 
                                            <Button 
                                            // onClick={handleEditMode}  
                                            size="large" className={classes.margin} 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit">
                                                Editar anuncio
                                            </Button> 
                    
                                            <Button 
                                            //onClick={handleDeleteAdvert}  
                                            size="large" 
                                            className={classes.margin} 
                                            variant="contained" 
                                            color="secondary" 
                                            type="submit">
                                                Borrar anuncio
                                            </Button>  </div>  
                
                               
                                            </div>  */}

                                        <div className="button-container">
                                           
                    
                                           <button
                                           //onClick={handleChat}
                                           className="edit-button"
                                           >
                                               Ver anuncio
                                           </button> 
                                           
                                           </div> 
                      </div>
                    </div>
                    
                    
                    </div>

                

            <div className="container">
                    <div className="card">
                      <div className="card-header">
                      <img  src="https://www.newsbtc.com/wp-content/uploads/2020/06/mesut-kaya-LcCdl__-kO0-unsplash-scaled.jpg"  />
                      </div>
                      <div className="card-body">
                          
                     
                      <div className="price-container"> <div className="price-status"> En venta:  <span className="price-header">65 €</span> </div> </div>

                      {/* <div className="price-container">{advert.status === 1 && <div className="price-status"> Ofrezco máximo:  <span className="price-header">{advert.price} €</span> </div> }</div> */}

                      
                                            {/* <div className="tags-container">{advert.tags.map(tag => {
                                                return <span className="tag tag-teal" key={tag}>{tag}</span>
                                            })} </div> */}

                        <div className="tags-container"> </div>
                                        
                        <h2>
                          Globos aerostaticos
                        </h2>
                        <p>
                          Los mejores globos aerostaticos para pasar un buen rato en las alturas haciendo el memo
                        </p>
                        {/* <div className="user">
                          <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                          <div className="user-info">
                            <h5>Madrid</h5>
                            
                          </div>
                          
                    
                        </div> */}
                        {/* <div>
                                    
                                    
                                        <div> 
                                            <Button 
                                            // onClick={handleEditMode}  
                                            size="large" className={classes.margin} 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit">
                                                Editar anuncio
                                            </Button> 
                    
                                            <Button 
                                            //onClick={handleDeleteAdvert}  
                                            size="large" 
                                            className={classes.margin} 
                                            variant="contained" 
                                            color="secondary" 
                                            type="submit">
                                                Borrar anuncio
                                            </Button>  </div>  
                
                               
                                            </div>  */}

                                        <div className="button-container">
                                           
                    
                                           <button
                                           //onClick={handleChat}
                                           className="edit-button"
                                           >
                                               Ver anuncio
                                           </button> 
                                           
                                           </div> 
                      </div>
                    </div>
                    
                    
                    </div>

            

                    

            </div>

            <style jsx>{`
                    
                    
                    .ads-container{
                      display:flex;
                      justify-content: flex-start;
                      flex-direction: row;
                      align-content: center;
                      flex-wrap: wrap;
                    }

                    @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
                        * {
                        box-sizing: border-box;
                        }

                        h1{
                            text-align:center;
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

const mapStateToProps = state => ({
    isLogged: getIsLogged(state),
    isLoading: getIsLoading(state),
    error: getError(state),
    myAdverts: getMyAdverts(state),
})



export default connect(mapStateToProps)(MyAdverts);


