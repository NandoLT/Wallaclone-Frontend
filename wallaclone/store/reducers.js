import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_REGISTER_SUCCESS,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_FAILURE,
    AUTH_RESET_STATE,
    ADVERTS_SUCCESS,
    ADVERTS_REQUEST,
    ADVERT_CREATION_REQUEST,
    ADVERT_CREATION_SUCCESS,
    ADVERT_CREATION_FAILURE,
    GET_ADVERTS_REQUEST,
    GET_ADVERTS_SUCCESS,
    GET_ADVERTS_FAILURE,
    AUTH_RECOVER_PASSWORD_REQUEST,
    AUTH_RECOVER_PASSWORD_FAILURE,
    AUTH_RESET_PASSWORD_REQUEST,
    AUTH_RECOVER_PASSWORD_SUCCESS,
    AUTH_RESET_PASSWORD_SUCCESS,
    AUTH_RESET_PASSWORD_FAILURE,
    ADVERT_GET_FAVORITES_REQUEST,
    ADVERT_GET_FAVORITES_SUCCESS,
    ADVERT_GET_FAVORITES_FAILURE,
    ADVERT_ADD_FAVORITE_REQUEST,
    ADVERT_ADD_FAVORITE_SUCCESS,
    ADVERT_ADD_FAVORITE_FAILURE,
    ADVERT_DELETE_FAVORITE_REQUEST,
    ADVERT_DELETE_FAVORITE_SUCCESS,
    ADVERT_DELETE_FAVORITE_FAILURE,
    ADVERT_UPDATE_REQUEST,
    ADVERT_UPDATE_SUCCESS,
    ADVERT_UPDATE_FAILURE,
    FETCH_MY_ADVERTS_SUCCESS,
    FETCH_MY_ADVERTS_REQUEST,
    FETCH_MY_ADVERTS_FAILURE,
    GET_MY_PROFILE_DETAILS_SUCCESS,
    GET_MY_PROFILE_DETAILS_REQUEST,
    GET_MY_PROFILE_DETAILS_FAILURE,
    GET_MY_FAVORITE_ADVERTS_SUCCESS,
    GET_MY_FAVORITE_ADVERTS_REQUEST,
    GET_MY_FAVORITE_ADVERTS_FAILURE,
    SET_USER_ID
} from "./types";
import { combineReducers } from 'redux';


const initialState = {
    auth: false,
    userId: null,
    myProfileDetails: null,
    favoriteAdverts: [],
    myFavoriteAdverts: [],
    myAdverts: [],
    ui: {
        loading: false,
        error: null,
        successMessage: null,
    },

    adverts: [],
    totalAdverts: null
}


export const auth = (state = initialState.auth, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
        case AUTH_REGISTER_SUCCESS:
            return true;

        case AUTH_LOGIN_FAILURE:
        case AUTH_REGISTER_FAILURE:
            return false;
        case AUTH_LOGOUT:
            return false;
        default:
            return state;
    }
}

export const adverts = (state = initialState.adverts, action) => {
    switch (action.type) {
        case GET_ADVERTS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export const setUserId = (state = initialState.userId, action) => {
    switch (action.type) {
        case SET_USER_ID:
            return action.payload
        default:
            return state;
    }
}

export const myAdverts = (state = initialState.myAdverts, action) => {
    switch (action.type) {
        case FETCH_MY_ADVERTS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export const myFavoriteAdverts = (state = initialState.myFavoriteAdverts, action) => {
    switch (action.type) {
        case GET_MY_FAVORITE_ADVERTS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export const myProfileDetails = (state = initialState.myProfileDetails, action) => {
    switch (action.type) {
        case GET_MY_PROFILE_DETAILS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}


export const favoriteAdverts = (state = initialState.favoriteAdverts, action) => {
    switch (action.type) {
        case ADVERT_GET_FAVORITES_SUCCESS:
            return action.payload

        case ADVERT_ADD_FAVORITE_SUCCESS:
            return [...state, action.payload]

        case ADVERT_DELETE_FAVORITE_SUCCESS:
            const index = state.indexOf(action.payload);
            if (index > -1) {
                state.splice(index, 1);
            }

            return [...state];

        default:
            return state;
    }
};

export const ui = (state = initialState.ui, action) => {
    if (action.error) {
        return { ...state, loading: false, error: action.payload }
    }
    if (action.successMessage) {
        console.log(action.successMessage)
        return { ...state, loading: false, error: null, successMessage: action.payload }
    }
    switch (action.type) {
        case AUTH_RESET_STATE:
            return {
                loading: false,
                error: null,
                successMessage: null,
            };

        case AUTH_LOGIN_REQUEST:
        case AUTH_REGISTER_REQUEST:
        case ADVERT_CREATION_REQUEST:
        case ADVERT_UPDATE_REQUEST:
        case GET_ADVERTS_REQUEST:
        case FETCH_MY_ADVERTS_REQUEST:
        case GET_MY_FAVORITE_ADVERTS_REQUEST:
        case GET_MY_PROFILE_DETAILS_REQUEST:
        case AUTH_RECOVER_PASSWORD_REQUEST:
        case AUTH_RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                error: null,
            };

        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
        case ADVERT_CREATION_SUCCESS:
        case ADVERT_UPDATE_SUCCESS:
        case GET_ADVERTS_SUCCESS:
        case GET_MY_FAVORITE_ADVERTS_SUCCESS:
        case GET_MY_PROFILE_DETAILS_SUCCESS:
        case FETCH_MY_ADVERTS_SUCCESS:
        case AUTH_REGISTER_SUCCESS:
        case AUTH_RECOVER_PASSWORD_SUCCESS:
            return {
                loading: false,
                error: null,
            };
        case AUTH_RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                error: null,
                successMessage: action.payload
            };
        case AUTH_LOGIN_FAILURE:
        case AUTH_REGISTER_FAILURE:
        case ADVERT_CREATION_FAILURE:
        case ADVERT_UPDATE_FAILURE:
        case GET_ADVERTS_FAILURE:
        case GET_MY_FAVORITE_ADVERTS_FAILURE:
        case FETCH_MY_ADVERTS_FAILURE:
        case GET_MY_PROFILE_DETAILS_FAILURE:
        case AUTH_RECOVER_PASSWORD_FAILURE:
        case AUTH_RESET_PASSWORD_FAILURE:
            return {
                loading: false,
                error: true,
            };

        default:
            return state;

    }
}



const reducer = combineReducers({
    auth,
    ui,
    adverts,
    favoriteAdverts,
    myAdverts,
    myProfileDetails,
    myFavoriteAdverts,
    setUserId,
})

export default reducer;