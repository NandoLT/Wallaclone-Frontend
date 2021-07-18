import client from "./client";

const advertsPath = '/api/adverts'

const createAdvertPath = '';


export const getAdverts = async () => {

    try {
        const adverts = await client.get(advertsPath)
        return adverts;
    } catch (err) {
        console.log(err);
    }
}

export const createAdvert = async () => {

    try {
        const newAdvertID= await client.post(createAdvertPath) // Suponiendo que el back me devolviese el ID del anuncio recien creado
        
    } catch (err) {
        console.log(err);
    }
}