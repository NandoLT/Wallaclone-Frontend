import client from "./client";

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