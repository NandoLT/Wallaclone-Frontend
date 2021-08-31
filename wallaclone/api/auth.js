import client from "./client";
import storage from "../utils/storage";
import { configureClient, resetClient } from "./client";

const authPath = '/api/users'

export const login = (remember, credentials) => {
    return client.post(`${authPath}/login`, credentials).then(({ token }) => {

        return token;
    })
        .then(token => {
            configureClient(token);
            if (remember) {

                storage.set('authToken', token, true)
            } else {
                storage.set('authToken', token, false)
            }
        })

}


export const recoverPassword = (email) => {
    return client.post(`${authPath}/recoverpassword`, email).then(({ token }) => {
        configureClient(token);
        storage.set('recoverToken', token);
    });
}

export const register = (remember, credentials) => {

    return client.post(`${authPath}/register`, credentials).then(({ token }) => {

        return token;
    })
        .then(token => {
            configureClient(token);
            if (remember) {

                storage.set('authToken', token)
            }
        })
}


export const resetPassword = (passwords) => {
    return client.post(`${authPath}/resetpassword`, passwords).then(() => {
        resetClient();
        storage.remove('recoverToken');
    });
}

export const logout = () => {
    return Promise.resolve().then(() => {
        resetClient();
        storage.remove('authToken');
        
    });
};
