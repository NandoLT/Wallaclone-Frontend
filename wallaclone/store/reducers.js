


import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_REGISTER_SUCCESS } from "./types";
import {combineReducers} from 'redux';


const initialState = {
    auth: false,
    loading:false,
    //adverts: [],
    //ui: {}
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
            return {...state, auth:true};
        case AUTH_LOGOUT:
            return {...state, auth:false};
        default:
            return state;
    }

}

export default reducer;