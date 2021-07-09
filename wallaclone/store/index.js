import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as api from '../api'


const configureStore = ({ preloadedState, api }) => {
    const store = createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ api }))));
    return store
}

export default configureStore;