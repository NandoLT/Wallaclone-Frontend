import { createStore, applyMiddleware, combineReducers } from 'redux';
import  * as reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import * as api from '../api';
import router from 'next/router';


const configureStore = ({ preloadedState }) => {
    const store = createStore(combineReducers(reducers), preloadedState, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ api, router }))));

    return store
}

export default configureStore;