import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import orders from './orders';
import Products, {loadProducts} from './repo/products';
import products from './products';
import members from './members'
import repo from './repo';
import order, {newOrder} from "./order";
import saga from "redux-saga";
import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {CREATE_ORDER} from "./mutations";
import query from "../query";
import {createOrder, loadOrders} from "./repo/orders";
import {loadMembers} from "./repo/members";
import switches, {appNavigation, navigate} from "./switches";

// Action Types
export const INIT = 'bingo/INIT';
// Action Creators
export const init = () => ({type: INIT});

// Reducer
const reducer = combineReducers({
    orders,
    products,
    Products,
    members,
    repo,
    order,
    switches,
});

const sagas = saga();

// noinspection JSUnresolvedVariable, JSUnresolvedFunction
const store = createStore(reducer,
    compose(
        applyMiddleware(sagas),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagas.run(function* () {
    yield takeLatest(CREATE_ORDER, function* (action) {
        let details = action.payload.details.map(item => ({name: item.name, price: item.price, amount: item.amount}));
        let res = yield query('mutation ($details: [OrderDetailInput!]!) { createOrder (details: $details) { id date status details { name price amount } } }', {details});
        let json = yield res.json();
        let data = json.data;
        yield put(createOrder(data.createOrder));
        yield put(newOrder())
    });
    yield takeEvery(INIT, function* () {
        const res = yield query('query { products(limit: 60) {id name price type} orders (limit: 200) { id date status details { name price amount} member { id name } total } members (limit: 2000) { id name number }}');
        const json = yield res.json();
        const data = json.data;
        yield put(loadProducts(data.products));
        yield put(loadOrders(data.orders));
        yield put(loadMembers(data.members));
        yield put(appNavigation.setter(1))
    });
});

export default store;