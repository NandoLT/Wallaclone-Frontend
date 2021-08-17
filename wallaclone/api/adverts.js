import client  from "./client";

const advertsPath = '/api/adverts'

export const getAdverts = async () => {
    const adverts = await client.get(advertsPath)
    return adverts;
}

export const getAdvertDetail = async (id) => {
    const advert = await client.get(advertsPath + `/${id}`)
    return advert.result
}

export const createAdvert = async (advertDetails) => {
    return client.post(`${advertsPath}`, advertDetails);    
}

export const getFavorites = async () => {
    const favs = await client.post(`${advertsPath}/getFavorites`);
    return favs.result;
}

export const addFavorites = async (advertId) => {
    return await client.post(`${advertsPath}/addFavorite`, advertId);
}

export const removeFavorites = async (advertId) => {
    return await client.post(`${advertsPath}/removeFavorite`, advertId);
}