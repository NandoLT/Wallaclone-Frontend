

import { authRegister, authLogin, authLogout } from "./actions";
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from "./types";


const initialState = {
    auth: false,
    //adverts: [],
    //ui: {}
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case AUTH_REGISTER:
        case AUTH_LOGIN:
            return {...state, auth:true};
        case AUTH_LOGOUT:
            return {...state, auth:true};
        default:
            return state;
    }

}