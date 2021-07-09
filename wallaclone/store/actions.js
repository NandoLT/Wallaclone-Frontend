import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from "./types";


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


export const authLoginAction = (remmeber, ...credentials) => {
    return async function (dispatch, getState, { api }) {
        try {
            //Manejo de Api
            dispatch(authLogin())
        } catch (err) {

        }
    }
}