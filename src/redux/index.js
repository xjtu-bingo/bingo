import {combineReducers, createStore} from 'redux';
import orders from './orders';
import Products from './repo/products';
import products from './products';
import members from './members'
import repo from './repo';
import order from "./order";

const reducer = combineReducers({
    orders,
    products,
    Products,
    members,
    repo,
    order
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;