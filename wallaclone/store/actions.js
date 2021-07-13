import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_REGISTER_SUCCESS, AUTH_RESET_STATE, ADVERTS_GET } from "./types";


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

export const authLoginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
    }
}

export const authLoginFailure = () => {
    return {
        type: AUTH_LOGIN_FAILURE,
    }
}

export const authRegisterRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
    }
}

export const authRegisterSuccess = () => {
    return {
        type: AUTH_REGISTER_SUCCESS,
    }
}

export const authRegisterFailure = () => {
    return {
        type: AUTH_LOGIN_FAILURE,
    }
}

export const authResetState = () =>{
    return {
        type:AUTH_RESET_STATE,
    }
}

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
}

export const advertsGet = (adverts) => {
    return {
        type: ADVERTS_GET,
        payload: adverts
    }
}

export const authLoginAction = (remember, credentials) => {
    return async function (dispatch, getState, { api, router }) {
       
        dispatch(authLoginRequest())
        
        try {
            await api.auth.login(remember, credentials);
            dispatch(authLoginSuccess());
            router.push('/adverts');
        } catch (error) {
            console.log(error)
            dispatch(authLoginFailure())
        }
    }
}

export const authRegisterAction = (credentials) => {
    return async function (dispatch, getState, { api, router }) {
        dispatch(authRegisterRequest());
        try {
            await api.auth.register(credentials)
            dispatch(authRegisterSuccess());
            router.push('/adverts')
        } catch (err) {
            console.log(err)
            dispatch(authRegisterFailure());
            
        }
    }
}

export const advertsGetAction = () => {
    return async function (dispatch, getState, { api, router }) {
        try {
            const adverts = await api.adverts.getAdverts();
            dispatch(advertsGet(adverts));
        } catch (err) {
            console.log(err)
        }
    }
}


