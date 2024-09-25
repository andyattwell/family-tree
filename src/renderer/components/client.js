import { applyMiddleware,combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import api from '../api'
import { SERVER_URL } from '../config'

const initialState = {
    fetching : false,
    fetched: false,
    trees: [],
    error: null
}

const treesReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TREE_PENDING':
            state = { 
                ...state, 
                fetching: true 
            }
            break;
        case 'FETCH_TREE_FULFILLED':
            state = { 
                ...state, 
                fetching: false, 
                fetched:true, 
                trees:action.payload.data 
            }
            break;
        case 'FETCH_TREE_REJECTED':
            state = { 
                ...state, 
                fetching: false, 
                error: action.payload.response.data
            }
            break;
        default:
            break;
    }
    return state;
}

const middleware = applyMiddleware(promise(), thunk, logger)

const store = createStore(treesReducer, middleware);

store.subscribe(() => {
    console.log('Store changed', store.getState());
});

store.dispatch({
    type: 'FETCH_TREE',
    payload: api.get(SERVER_URL+'arbol')
})