import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_REGISTER_SUCCESS, AUTH_RESET_STATE, GET_ADVERTS_REQUEST, GET_ADVERTS_SUCCESS, GET_ADVERTS_FAILURE, ADVERT_CREATION_FAILURE, ADVERT_CREATION_REQUEST, ADVERT_CREATION_SUCCESS } from "./types";


export const authRegister = () => {
    return {
        type: AUTH_REGISTER,
    }
}

export const authLoginSuccess = (userId) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        userId : userId
    }
}

export const authLoginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
    }
}

export const authLoginFailure = (error) => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload:error,
        error:true
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

export const authRegisterFailure = (error) => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload:error,
        error:true
    }
}

export const authResetState = () => {
    return {
        type: AUTH_RESET_STATE,
    }
}

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT,
    }
}

export const getAdvertsSuccess = (adverts) => {
    return {
        type: GET_ADVERTS_SUCCESS,
        payload: adverts
    }
}

export const getAdvertsRequest = () => {
    return {
        type: GET_ADVERTS_REQUEST
    }
}

export const getAdvertsFailure = error =>{
    return{
        type: GET_ADVERTS_FAILURE,
        payload:error,
        error:true,
    }
}

export const advertCreationRequest = () => {
    return {
        type: ADVERT_CREATION_REQUEST,
    }
}

export const advertCreationSuccess = (advertDetails) =>{
    return {
        type: ADVERT_CREATION_SUCCESS,
        advertDetails: advertDetails,
    }
}

export const advertCreationFailure = error =>{
    return{
        type:ADVERT_CREATION_FAILURE,
        payload:error,
        error:true,
    }
}

export const authLoginAction = (remember, credentials) => {
    return async function (dispatch, getState, { api, router }) {

        dispatch(authLoginRequest())

        try {
            const userId = await api.auth.login(remember, credentials);
            dispatch(authLoginSuccess(userId));
            router.push('/adverts');
        } catch (error) {
            dispatch(authLoginFailure(error.message))
        }
    }
}

export const authLogoutAction = () => {
    return async function (dispatch, getState, { api, router }) {

            await api.auth.logout();
            dispatch(authLogout());
            router.push('/login');
            
    }
}

export const authRegisterAction = (credentials) => {
    return async function (dispatch, getState, { api, router }) {
        dispatch(authRegisterRequest());
        try {
            await api.auth.register(credentials)
            dispatch(authRegisterSuccess());
            router.push('/adverts')
        } catch (error) {
            dispatch(authLoginFailure(error.message))

        }
    }
}

export const advertsGetAction = () => {
    return async function (dispatch, getState, { api, router }) {
        dispatch(getAdvertsRequest());
        try {
            const adverts = await api.adverts.getAdverts();
            dispatch(getAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(getAdvertsFailure(error.message));
        }
    }
}


export const advertCreationAction = (advertDetails) => {
    return async function (dispatch, getState, { api, router }) {
        dispatch(advertCreationRequest());
        try {
            await api.adverts.createAdvert(advertDetails);
            dispatch(advertCreationSuccess(advertDetails));
            router.push('/adverts');
        } catch (error) {
            dispatch(advertCreationFailure(error.message));
        }
    }
}


