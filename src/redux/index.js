import {combineReducers, createStore} from 'redux';
import orders from './orders';
import products from './products';

const reducer = combineReducers({
    orders,
    products
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;