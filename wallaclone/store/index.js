import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import * as api from '../api';
import router from 'next/router';


const configureStore = ({ preloadedState }) => {
    const store = createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ api, router }))));

    return store
}

export default configureStore;