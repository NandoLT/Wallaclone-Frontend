import client from "./client";
import storage from "../utils/storage";

const authPath = 'api/users'


export const login = (remember, credentials) => {
    console.log("Remember",remember);
    console.log("Credentials", credentials);
   
    return client.post(`${authPath}/login`, credentials).then(({ accesToken }) => {
        return accesToken;
    })
        .then(accesToken => {
            if (remember) {
                storage.set('authToken', accesToken)
            }
        })
}

export const logout = () => {
    /* hay que hacerlo */
    return;
}