import { 
    AUTH_LOGIN, 
    AUTH_LOGOUT, 
    AUTH_REGISTER, 
    AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_FAILURE, 
    AUTH_REGISTER_SUCCESS, 
    AUTH_RESET_STATE, 
    GET_ADVERTS_REQUEST, 
    GET_ADVERTS_SUCCESS, 
    GET_ADVERTS_FAILURE, 
    ADVERT_CREATION_FAILURE, 
    ADVERT_CREATION_REQUEST, 
    ADVERT_CREATION_SUCCESS, 
    AUTH_RECOVER_PASSWORD_REQUEST, 
    AUTH_RECOVER_PASSWORD_SUCCESS, 
    AUTH_RECOVER_PASSWORD_FAILURE, 
    AUTH_RESET_PASSWORD_REQUEST, 
    AUTH_RESET_PASSWORD_SUCCESS, 
    AUTH_RESET_PASSWORD_FAILURE, 
    CONFIRM_PASSWORD_FAILURE,
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

export const authRecoverPasswordRequest = () => {
    return {
        type: AUTH_RECOVER_PASSWORD_REQUEST,
    }
}

export const authRecoverPasswordSuccess = (successMessage) => {
    return {
        type: AUTH_RECOVER_PASSWORD_SUCCESS,
        payload: successMessage,
        successMessage:true,
    }
}

export const authRecoverPasswordFailure = (error) => {
    return {
        type: AUTH_RECOVER_PASSWORD_FAILURE,
        payload:error,
        error:true
    }
}

export const authResetPasswordRequest = () => {
    return {
        type: AUTH_RESET_PASSWORD_REQUEST,
    }
}

export const authResetPasswordSuccess = (successMessage) => {
    return {
        type: AUTH_RESET_PASSWORD_SUCCESS,
        payload:successMessage,
        successMessage:true,
    }
}

export const authResetPasswordFailure = (error) => {
    return {
        type: AUTH_RESET_PASSWORD_FAILURE,
        payload:error,
        error:true
    }
}

export const confirmPasswordFailureAction = error => {
    return {
        type: CONFIRM_PASSWORD_FAILURE,
        payload:error,
        error:true,

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

export const authrecoverPasswordAction = (email) => {
    return async function (dispatch, getState, { api, router }) {

        dispatch(authRecoverPasswordRequest())

        try {
            await api.auth.recoverPassword(email);
            dispatch(authRecoverPasswordSuccess("Te acabamos de enviar un email para reestablecer tu contraseña"));
           
           
        } catch (error) {
            dispatch(authRecoverPasswordFailure(error.message))
        }
    }
}

export const authresetPasswordAction = (passwords) => {
    return async function (dispatch, getState, { api, router }) {

        dispatch(authResetPasswordRequest())

        try {
            await api.auth.resetPassword(passwords);
            dispatch(authResetPasswordSuccess("Contraseña reestablecida con éxito"));
            router.push('/login');
        } catch (error) {
            dispatch(authResetPasswordFailure(error.message))
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
            await api.adverts.addFavorites({ advertId });
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
            await api.adverts.removeFavorites({ advertId });
            dispatch(advertDeleteFavoritesSuccess(advertId));
        } catch (error) {
            dispatch(advertDeleteFavoritesFailure(error));
        }
    }
}