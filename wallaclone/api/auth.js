import client from "./client";
import storage from "../utils/storage";
import parseAuthToken from "../utils/parseAuthToken";
import { configureClient } from "./client";

const authPath = '/api/users'



export const login = (remember, credentials) => {

    return client.post(`${authPath}/login`, credentials).then(({ token }) => {

        return token;
    })
        .then(token => {
            const userId = parseAuthToken(token);
            configureClient(token);
            if (remember) {

                storage.set('authToken', token)
            }
            return userId;
        })

}



export const register = (remember, credentials) => {

    return client.post(`${authPath}/register`, credentials).then(({ token }) => {

        return token;
    })
        .then(token => {
            const userId = parseAuthToken(token);
            configureClient(token);
            if (remember) {

                storage.set('authToken', token)
            }
            return userId;
        })
}

export const logout = () => {
    return Promise.resolve().then(storage.clear);
};