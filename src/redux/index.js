import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import orders from './orders';
import Products, {loadProducts} from './repo/products';
import products from './products';
import members from './members'
import repo from './repo';
import order, {newOrder} from "./order";
import saga from "redux-saga";
import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
    CREATE_MEMBER,
    CREATE_ORDER,
    UPDATE_MEMBER_BALANCE_TOPUP,
    UPDATE_ORDER_MEMBER,
    UPDATE_ORDER_STATUS
} from "./mutations";
import query from "../query";
import {createOrder, loadOrders, updateOrder} from "./repo/orders";
import {createMember, loadMembers, updateMember} from "./repo/members";
import switches, {appNavigation, isMemberSignUpOpen, isMemberTopUpOpen} from "./switches";
import search, {complete, reset, START, start, UPDATE_KEY} from "./search";
import * as config from "../config";
import messages, {iMQ} from "./messages";

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
    search,
    messages,
});

const sagas = saga();

// noinspection JSUnresolvedVariable, JSUnresolvedFunction
const store = createStore(reducer,
    compose(
        applyMiddleware(sagas),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

sagas.run(function* () {
    yield takeEvery(CREATE_ORDER, function* (action) {
        let details = action.payload.details.map(item => ({name: item.name, price: item.price, amount: item.amount}));
        let res = yield query('mutation ($details: [OrderDetailInput!]!) { createOrder (details: $details) { id date status details { name price amount } } }', {details});
        let json = yield res.json();
        let data = json.data;
        yield put(createOrder(data.createOrder));
        yield put(newOrder())
    });
    yield takeLatest(INIT, function* () {
        const res = yield query(`query { products(limit: ${config.initial.products}) {id name price type} orders (limit: ${config.initial.orders}) { id date status details { name price amount} member { id name } total } members (limit: ${config.initial.members}) { id name number abbr balance tel}}`);
        const json = yield res.json();
        const data = json.data;
        yield put(loadProducts(data.products));
        yield put(loadOrders(data.orders));
        yield put(loadMembers(data.members));
        yield put(appNavigation.setter(1))
    });
    yield takeEvery(UPDATE_ORDER_STATUS, function* (action) {
        const res = yield query('mutation ($id: ID!, $status: OrderStatus!) { updateOrderStatus (id: $id, status: $status) { id date status details { name price amount } member { id name balance } total } }', action.payload);
        const json = yield res.json();
        if (json.errors) {
            const code = parseInt(json.errors[0].message);
            const messages = [null, "用户余额不足", "不支持的订单状态转移"];
            yield put(iMQ({type: 'ERROR', message: `${messages[code]}`}));
        } else {
            const data = json.data;
            const order = data.updateOrderStatus;
            yield put(updateOrder(order));
            if (order.member) {
                yield put(updateMember(order.member));
                if (order.status === 'PAID') {
                    yield put(iMQ({
                        type: 'INFO',
                        message: `${order.member.name} 消费 ￥${order.total}，余额 ￥${order.member.balance}`
                    }));
                } else if (order.status === 'NEW') {
                    yield put(iMQ({
                        type: 'INFO',
                        message: `${order.member.name} 退款 ￥${order.total}，余额 ￥${order.member.balance}`
                    }));
                }
            }
        }
    });
    yield takeEvery(CREATE_MEMBER, function* (action) {
        const res = yield query('mutation ($name: String!, $abbr: String, $gender: Gender, $birthday: String, $tel: String, $number: String!, $balance: Float!) { createMember (name: $name, abbr: $abbr, gender: $gender, birthday: $birthday, tel: $tel, number: $number, balance: $balance) { id name number abbr balance tel } }', action.payload);
        const json = yield res.json();
        const data = json.data;
        yield put(createMember(data.createMember));
        yield put(isMemberSignUpOpen.setFalse());
    });
    yield takeLatest(UPDATE_KEY, function* (action) {
        if (action.payload) {
            yield delay(config.search.delay);
            yield put(start());
        } else {
            yield put(reset());
        }
    });
    yield takeEvery(START, function* () {
        const state = store.getState();
        const {repo} = state;
        const {members} = repo;
        const key = state.search.key;
        const res = {
            members: {}
        };
        // search member
        const keyRE = RegExp(key, 'i');
        Object.values(members).forEach(member => {
            const {id, number, name, abbr, tel} = member;
            if (keyRE.test(abbr) || keyRE.test(name) || keyRE.test(number) || keyRE.test(tel)) {
                res.members[id] = member;
            }
        });
        yield put(complete(res));
    });
    yield takeEvery(UPDATE_MEMBER_BALANCE_TOPUP, function* (action) {
        const req = yield query('mutation ($id: ID!, $amount: Float!) { updateMemberBalanceTopup (id: $id, amount: $amount) { id balance }}', action.payload);
        const json = yield req.json();
        const data = json.data;
        yield put(updateMember(data.updateMemberBalanceTopup));
        yield put(start()); // refresh searching
        yield put(isMemberTopUpOpen.setFalse());
    });
    yield takeEvery(UPDATE_ORDER_MEMBER, function* (action) {
        const res = yield query('mutation ($orderId: ID!, $memberId: ID) { updateOrderMember (orderId: $orderId, memberId: $memberId) { id member { id name } } }', action.payload);
        const json = yield res.json();
        const data = json.data;
        yield put(updateOrder(data.updateOrderMember));
    })
});

export default store;