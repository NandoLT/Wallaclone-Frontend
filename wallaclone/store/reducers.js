


import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_REGISTER_SUCCESS, AUTH_LOGIN_REQUEST, AUTH_LOGIN_FAILURE, AUTH_REGISTER_REQUEST, AUTH_REGISTER_FAILURE } from "./types";
import {combineReducers} from 'redux';


const initialState = {
    auth: false,
    loading:false,
    error: null,
    //adverts: [],
    //ui: {}
}


const reducer = (state= initialState, action) => {
    switch (action.type) {

        case AUTH_LOGIN_REQUEST:
        case AUTH_REGISTER_REQUEST:
            return {...state, 
                loading:true,
                error:false,    
            };

        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
            return {...state, 
                auth:true,
                loading:false,    
            };
        
        case AUTH_LOGIN_FAILURE:
        case AUTH_REGISTER_FAILURE:
            return {...state, 
                auth:false,
                loading:false,
                error:true,    
            };
        case AUTH_LOGOUT:
            return {...state, auth:false};
        default:
            return state;
    }

}

export default reducer;