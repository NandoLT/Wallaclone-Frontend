import client from "./client";
import storage from "../utils/storage";

const authPath = '/api/users'



export const login = (remember, credentials) => {

    return client.post(`${authPath}/login`, credentials).then(({ token }) => {
        
        return token;
    })
        .then(token => {
            if (remember) {
               
                storage.set('authToken', token)
            }
        })
}



export const register = (credentials) => {
   
    return client.post(`${authPath}/register`, credentials)
    //.then RECIBIR EL TOKEN POR PARTE DEL BACK PARA GUARDARLO EN EL STORAGE
}

export const logout = () => {
    return Promise.resolve().then(storage.clear);
  };