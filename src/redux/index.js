import {combineReducers, createStore} from 'redux';
import orders from './orders';
import Products from './repo/products';
import products from './products';

const reducer = combineReducers({
    orders,
    products,
    Products
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;