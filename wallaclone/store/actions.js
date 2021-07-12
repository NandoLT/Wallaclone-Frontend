import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_REGISTER_SUCCESS } from "./types";

export const authRegister = () => {
    return {
        type: AUTH_REGISTER,
    }
}

export const authLoginSuccess = () => {
    return {
        type: AUTH_LOGIN_SUCCESS,
    }
}

export const authRegisterSuccess = () => {
    return {
        type: AUTH_REGISTER_SUCCESS,
    }
}


export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
}


export const authLoginAction = (remember, credentials) => {    
    return async function (dispatch, getState, { api, router }) {
        try {
            await api.auth.login(remember, credentials);
            dispatch(authLoginSuccess());
            router.push('/adverts');
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const authRegisterAction = (credentials) => {
    return async function (dispatch, getState, { api, router }) {
        try {
            await api.auth.register(credentials)
            dispatch(authRegisterSuccess());
            router.push('/adverts')
        } catch (err) {
            console.log(err)
        }
    }
}
