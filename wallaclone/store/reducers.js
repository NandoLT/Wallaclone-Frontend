


import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_REGISTER_SUCCESS, AUTH_LOGIN_REQUEST, AUTH_LOGIN_FAILURE, AUTH_REGISTER_REQUEST, AUTH_REGISTER_FAILURE, AUTH_RESET_STATE, ADVERTS_GET } from "./types";
import {combineReducers} from 'redux';



const initialState = {
    auth: false,
    ui: {
        loading:false,
        error: null,
    },
    
    adverts: [],
    
}


// const oldReducer = (state= initialState, action) => {
//     switch (action.type) {

//         case AUTH_RESET_STATE:
//             return {...state, 
//                 loading:false,
//                 error:false,    
//             };

//         case AUTH_LOGIN_REQUEST:
//         case AUTH_REGISTER_REQUEST:
//             return {...state, 
//                 loading:true,
//                 error:false,    
//             };

//         case AUTH_REGISTER_SUCCESS:
//         case AUTH_LOGIN_SUCCESS:
//             return {...state, 
//                 auth:true,
//                 loading:false,    
//             };
        
//         case AUTH_LOGIN_FAILURE:
//         case AUTH_REGISTER_FAILURE:
//             return {...state, 
//                 auth:false,
//                 loading:false,
//                 error:true,    
//             };
//         case AUTH_LOGOUT:
//             return {...state, auth:false};
//         case ADVERTS_GET:
//                 return {...state, adverts: action.payload};
//         default:
//             return state;
//     }

// }

const auth = (state,action) => {
    switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return true ;
        
        case AUTH_LOGIN_FAILURE:
        case AUTH_REGISTER_FAILURE:
            return false;
        case AUTH_LOGOUT:
            return false;
        default:
            return state;
    }
}

const adverts = (state, action) => {
    switch (action.type) {
        case ADVERTS_GET:
            return action.payload
        default:
            return state;
    }
}

const ui = (state, action) => {
    switch(action.type) {
        case AUTH_RESET_STATE:
            return { 
                loading:false,
                error:null,    
            };
    
        case AUTH_LOGIN_REQUEST:
        case AUTH_REGISTER_REQUEST:
            return {
                loading:true,
                error:null,    
                    };

        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
             return { 
                 loading:false,    
                    error:null,
                            };
        case AUTH_LOGIN_FAILURE:
        case AUTH_REGISTER_FAILURE:
             return {
                    loading:false,
                    error:true,    
                                    };
        default:
            return state;

    }
}

function reducer (state= initialState, action) {
    return {
        auth: auth(state.auth, action),
        ui: ui(state.ui, action),
        adverts: adverts(state.adverts, action)
    }
}

// const reducer = combineReducers({
//     auth,
//     ui,
//     adverts
// })

export default reducer;