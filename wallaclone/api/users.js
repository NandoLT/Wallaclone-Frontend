import client from "./client";
import storage from "../utils/storage";
import parseAuthToken from "../utils/parseAuthToken";
import { configureClient, resetClient } from "./client";

const usersPath = '/api/users'

export const getMyProfile = async () => {
    const myProfile = await client.get(usersPath)
    return myProfile;
}