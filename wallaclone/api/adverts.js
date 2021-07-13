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