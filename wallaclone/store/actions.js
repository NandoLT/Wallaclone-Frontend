import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from "./types";


export const  authRegister = () =>{
    return {
        type: AUTH_REGISTER,
    }
}

export const  authLogin = () =>{
    return {
        type: AUTH_LOGIN,
    }
}

export const  authLogOUT = () =>{
    return {
        type: AUTH_LOGOUT,
    }
}