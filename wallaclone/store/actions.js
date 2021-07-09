import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from "./types";

import login from '../api/auth';

export const authRegister = () => {
    return {
        type: AUTH_REGISTER,
    }
}

export const authLogin = () => {
    return {
        type: AUTH_LOGIN,
    }
}


// export const authLoginRequest = () => {
//     return {
//         type: AUTH_LOGIN_REQUEST,
        
//     }    
// };

// export const authLoginSuccess = () => {
//     return {
//         type: AUTH_LOGIN_SUCCESS,
//     }    
// };

// export const authLoginFailure = error => {
//     return {
//         type: AUTH_LOGIN_FAILURE,
//         payload: error,
//         error:true
//     }    
// };

// export const authLogin = (remember, credentials) =>{ 

//     return async function(dispatch, getState){
        
//         try {
//           await login(credentials);
//           return {
//                     type: AUTH_LOGIN,
//                 }

          
//         } catch (error) {
//           console.log(error)
//         }
        
//     }

//   }


export const  authLogout = () =>{
    return {
        type: AUTH_LOGOUT,
    }
}


export const authLoginAction = (remmeber, ...credentials) => {
    return async function (dispatch, getState, { api }) {
        try {
            //Manejo de Api
            dispatch(authLogin())
        } catch (err) {

        }
    }
}