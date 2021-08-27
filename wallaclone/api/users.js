import client from "./client";
import storage from "../utils/storage";
import parseAuthToken from "../utils/parseAuthToken";
import { configureClient, resetClient } from "./client";

const usersPath = '/api/users'

export const getMyProfile = async () => {
    const myProfile = await client.get(usersPath)
    return myProfile;
}

export const getUserImage = async () => {
    const myUserImage = await client.get(`${usersPath}/getUserImage`)
    return myUserImage;
}

export const editMyProfile = () => {
    return client.put(`${usersPath}/updateuser`)
    
}




