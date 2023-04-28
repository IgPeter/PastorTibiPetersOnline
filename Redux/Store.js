import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import popularMessagesList from './Reducers/popularMessageList';

const reducers = combineReducers({
    //Reducers  here
    popularMessagesList: popularMessagesList
})

const store = createStore(
    reducers, 
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;