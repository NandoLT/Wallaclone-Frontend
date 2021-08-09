import client  from "./client";

const advertsPath = '/api/adverts'

export const getAdverts = async () => {

    try {
        const adverts = await client.get(advertsPath)
        return adverts;
    } catch (err) {
        console.log(err);
    }
}

export const getAdvertDetail = async (id) => {
    try {
        const advert = await client.get(advertsPath + `/${id}`)
        return advert.result
    } catch (err) {
        console.log(err)
    }
}
export const createAdvert = async (advertDetails) => {
    return client.post(`${advertsPath}`, advertDetails);    
}

export const updateAdvert = async (newAdvertDetails) => {
    return client.put(`${advertsPath}/updateAdvert`, newAdvertDetails);
}

export const deleteAdvert = (advertId) => {
    return client.post(`delete/${advertId}`)
}