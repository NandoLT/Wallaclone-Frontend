import client from "./client";

const authPath = ''


export const login = ({ remember, ...credentials }) => {
    return client.post(`${authPath}/login`, credentials).then(({ accesToken }) => {
        return accesToken;
    })
        .then(accesToken => {
            if (remember) {
                /* aqui lo metemos en el storage */
            }
        })
}

export const logout = () => {
    /* hay que hacerla */
    return;
}