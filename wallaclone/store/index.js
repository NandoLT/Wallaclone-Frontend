

import {createStore} from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


const configureStore = ({ preloadedState }) => {
    const store = createStore(reducer, preloadedState, composeWithDevTools());
    return store
}

export default configureStore;