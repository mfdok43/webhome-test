import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {actionSetCurrentPage, urlPageReducer} from "./urlPageReducer";
import {promiseReducer} from "./promiseReducer";

export const store = createStore(combineReducers({promise: promiseReducer,
        // urlPage:urlPageReducer
}),
    applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))
// store.dispatch(actionSetCurrentPage(1))



