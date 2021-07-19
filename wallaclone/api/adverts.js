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

export const createAdvert = async (advertDetails) => {

    return client.post(`${advertsPath}/new-advert`, advertDetails);

    
}