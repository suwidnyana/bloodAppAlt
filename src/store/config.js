import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';


let reduxCompsoe = compose;

if(__DEV__){
    reduxCompsoe = window.___REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configBlood = () => {
    return createStore(rootReducer, reduxCompsoe(applyMiddleware(promiseMiddleware)))
}

export default configBlood;