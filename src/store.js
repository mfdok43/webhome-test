import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {actionFindComments} from "./actionAddComments";

import {promiseReducer} from "./promiseReducer";

export const store = createStore(combineReducers({promise: promiseReducer,}),
    applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))

store.dispatch(actionFindComments())
