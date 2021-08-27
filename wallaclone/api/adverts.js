import client from "./client";

const advertsPath = '/api/adverts'

export const getAdverts = async (query) => {

    var url = advertsPath;
    if (query) {
        url += query
    }

    try {
        const adverts = await client.get(url)
        return adverts;
    } catch (err) {
        console.log(err);
    }
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

export const updateAdvert = async (newAdvertDetails) => {
    return client.put(`${advertsPath}/updateAdvert`, newAdvertDetails);
}

export const deleteAdvert = (advertId) => {
    return client.post(`${advertsPath}/delete/${advertId}`)
}

export const getMyAdverts = () => {
    return client.post(`${advertsPath}/getMyAdverts`)
}