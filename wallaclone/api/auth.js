import client from "./client";
import storage from "../utils/storage";
import parseAuthToken from "../utils/parseAuthToken";
import { configureClient, resetClient } from "./client";

const authPath = '/api/users'

export const login = (remember, credentials) => {
    return client.post(`${authPath}/login`, credentials).then(({ token }) => {
        configureClient(token);

        if (remember) {
            storage.set('authToken', token);
        }        
    });        
}

export const register = (credentials) => {
   
    return client.post(`${authPath}/register`, credentials)
    //.then RECIBIR EL TOKEN POR PARTE DEL BACK PARA GUARDARLO EN EL STORAGE
}

export const recoverPassword = (email) => {
    return client.post(`${authPath}/recoverpassword`, email);
}

export const resetPassword = (passwords) => {
    return client.post(`${authPath}/resetpassword`, passwords);
}

export const logout = () => {
    return Promise.resolve().then(() => {
        resetClient();
        storage.remove('authToken');
    });
  };