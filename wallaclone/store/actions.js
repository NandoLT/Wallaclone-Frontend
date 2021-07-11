import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from "./types";
import { login } from '../api/auth';

export const authRegister = () => {
    return {
        type: AUTH_REGISTER,
    }
}

export const authLogin = () => {
    return {
        type: AUTH_LOGIN,
    }
}


export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
}


export const authLoginAction = (remember, credentials) => {
    console.log(remember, credentials);
    return async function (dispatch, getState, { api, router }) {

        try {
            await login(remember, credentials)
            router.push('/adverts');

        } catch (error) {
            console.log(error)
        }

    }

}
