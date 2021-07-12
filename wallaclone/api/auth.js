import client from "./client";
import storage from "../utils/storage";

const authPath = '/api/users'


export const login = (remember, credentials) => {
    console.log("Remember", remember);
    console.log("Credentials", credentials);


    return client.post(`${authPath}/login`, credentials).then(({ token }) => {
        console.log(token);
        return token;
    })
        .then(token => {
            if (remember) {
                console.log(token)
                storage.set('authToken', token)
            }
        })
}

// export const register = (credentials) => {
//     console.log(credentials)
// }

export const register = (credentials) => {
   

    return client.post(`${authPath}/register`, credentials)
}

export const logout = () => {
    /* hay que hacerlo */
    return;
}