<div >
                    <img className="advert-photo" src={advert.photo ?  `https://pruebas-wallaclone.s3.eu-west-3.amazonaws.com/${advert.userId}/${advert.photo[0]}` : '/img/image-not-available.png'} />
                    {editMode && <div className= "pointer" onClick={() => console.log("Borrar Imagen")}> <DeleteForeverIcon onClick={()=> console.log("Borrar imagen")} color="secondary" fontsize="large"/> Borrar Imagen</div> }
                    {editMode && <div><Button  onClick={handleEditMode} disabled={false} size="large" className={classes.margin} variant="contained" color="secondary" type="submit">
                    Deshacer cambios
                </Button></div>}
                    {editMode ? 
                    <div>
                       <EditAdvertForm productId={id} advert={advert}/>
                       

                    </div>

                    :

                    <div>
                        <div>{advert.name}</div> 
                        <div>{advert.description}</div> 
                   <div> {advert.price} €</div> 
                    <div>{statusEnum[advert.status]}</div>
                    <div>{advert.province}</div>
                    <ul>
                        {advert.tags.map(tag => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul> 

                    </div>
                    
                     }
                    
                    <div>
                {(adBelongstoUser() && !editMode) 
                
                &&
                
                    <div> 
                        <Button 
                        onClick={handleEditMode}  
                        size="large" className={classes.margin} 
                        variant="contained" 
                        color="primary" 
                        type="submit">
                            Editar anuncio
                        </Button> 

                        <Button 
                        onClick={handleDeleteAdvert}  
                        size="large" 
                        className={classes.margin} 
                        variant="contained" 
                        color="secondary" 
                        type="submit">
                            Borrar anuncio
                        </Button>  </div>  

                }

                { (!adBelongstoUser())
                    &&

                  <div>
                        <Button 
                        onClick={handleChat}  
                        size="large" 
                        className={classes.margin} 
                        variant="contained" 
                        color="secondary" 
                        type="submit">
                            Contactar vendedor
                        </Button>  
                        </div> }
           
                        </div>
                   
                  
                </div>
