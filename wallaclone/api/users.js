import client from "./client";
import storage from "../utils/storage";
import { configureClient, resetClient } from "./client";

const usersPath = '/api/users'

export const getMyProfile = async () => {
    const myProfile = await client.get(usersPath)
    return myProfile.result;
}

export const getUserImage = async () => {
    const myUserImage = await client.get(`${usersPath}/getUserImage`)
    return myUserImage;
}

export const editMyProfile = async (userData) => {
    const response =  await client.put(`${usersPath}/updateuser`, userData)
    console.log(response.result);
    return response;

}




