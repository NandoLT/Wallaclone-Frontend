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