/**
 * Order Repository
 */

// Action Types
const LOAD = 'bingo/orders/LOAD';
const CREATE = 'bingo/orders/CREATE';
const UPDATE = 'bingo/orders/UPDATE';
const REMOVE = 'bingo/orders/REMOVE';

// Action Creators
export const loadOrders = (orders) => ({type: LOAD, payload: orders});
export const createOrder = (order) => ({type: CREATE, payload: order});
export const updateOrder = (order) => ({type: UPDATE, payload: order});
export const removeOrder = (order) => ({type: REMOVE, payload: order});

const mapId = (arr) => {
    let ret = {};
    arr.forEach(v => ret[v.id] = v);
    return ret;
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            return Object.assign({}, state, mapId(action.payload));
        default:
            return state;
    }
};

export default reducer;