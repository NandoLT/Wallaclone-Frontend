import { 
    AUTH_LOGIN, 
    AUTH_LOGOUT, 
    AUTH_REGISTER, 
    AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_FAILURE, 
    AUTH_REGISTER_SUCCESS, 
    AUTH_RESET_STATE, 
    ADVERTS_REQUEST, 
    ADVERTS_SUCCESS, 
    ADVERT_CREATION_FAILURE, 
    ADVERT_CREATION_REQUEST, 
    ADVERT_CREATION_SUCCESS,
    ADVERT_GET_FAVORITES_REQUEST,
    ADVERT_GET_FAVORITES_SUCCESS,
    ADVERT_GET_FAVORITES_FAILURE,
    ADVERT_ADD_FAVORITE_REQUEST,
    ADVERT_ADD_FAVORITE_SUCCESS,
    ADVERT_ADD_FAVORITE_FAILURE,
    ADVERT_DELETE_FAVORITE_REQUEST,
    ADVERT_DELETE_FAVORITE_SUCCESS,
    ADVERT_DELETE_FAVORITE_FAILURE
 } from "./types";


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

export const advertsGet = (adverts) => {
    return {
        type: ADVERTS_SUCCESS,
        payload: adverts
    }
}

export const advertsRequest = () => {
    return {
        type: ADVERTS_REQUEST
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

export const advertGetFavoritesRequest = () => {
    return {
        type: ADVERT_GET_FAVORITES_REQUEST
    }
}

export const advertGetFavoritesSuccess = (advertsIds) => {
    return {
        type: ADVERT_GET_FAVORITES_SUCCESS,
        payload: advertsIds
    }
}

export const advertGetFavoritesFailure = (error) => {
    return {
        type: ADVERT_GET_FAVORITES_FAILURE,
        payload: error,
        error: true
    }
}

export const advertAddFavoritesRequest = () => {
    return {
        type: ADVERT_ADD_FAVORITE_REQUEST
    }
}

export const advertAddFavoritesSuccess = (advertId) => {
    return {
        type: ADVERT_ADD_FAVORITE_SUCCESS,
        payload: advertId
    }
}

export const advertAddFavoritesFailure = (error) => {
    return {
        type: ADVERT_ADD_FAVORITE_FAILURE,
        payload: error,
        error: true
    }
}

export const advertDeleteFavoritesRequest = () => {
    return {
        type: ADVERT_DELETE_FAVORITE_REQUEST
    }
}

export const advertDeleteFavoritesSuccess = (advertId) => {
    return {
        type: ADVERT_DELETE_FAVORITE_SUCCESS,
        payload: advertId
    }
}

export const advertDeleteFavoritesFailure = (error) => {
    return {
        type: ADVERT_DELETE_FAVORITE_FAILURE,
        payload: error,
        error: true
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
        dispatch(advertsRequest());
        try {
            const adverts = await api.adverts.getAdverts();
            dispatch(advertsGet(adverts));
        } catch (err) {
            console.log(err)
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

export const advertGetFavoritesAction = () => {
    return async function (dispatch, getState, { api, router }) {
        dispatch(advertGetFavoritesRequest());
        try {
            const advertsIds = await api.adverts.getFavorites();
            dispatch(advertGetFavoritesSuccess(advertsIds));
        } catch (error) {
            dispatch(advertGetFavoritesFailure(error));
        }
    }
}

export const advertAddFavoritesAction = (advertId) => {
    return async function (dispatch, getState, { api, router }) {
        dispatch(advertAddFavoritesRequest());
        try {
            await api.adverts.addFavorites(advertId);
            dispatch(advertAddFavoritesSuccess(advertId));
        } catch (error) {
            dispatch(advertAddFavoritesFailure(error));
        }
    }
}

export const advertDeleteFavoritesAction = (advertId) => {
    return async function (dispatch, getState, { api, router }) {
        dispatch(advertDeleteFavoritesRequest());
        try {
            await api.adverts.removeFavorites(advertId);
            dispatch(advertDeleteFavoritesSuccess(advertId));
        } catch (error) {
            dispatch(advertDeleteFavoritesFailure(error));
        }
    }
}