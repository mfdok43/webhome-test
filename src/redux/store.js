import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {findReducer} from "./findReducer";


export const store = createStore(combineReducers({promise: findReducer}), applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))




