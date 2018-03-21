/**
 * Product Repository
 */

// Action Types
const LOAD = 'bingo/products/LOAD';
const CREATE = 'bingo/products/CREATE';
const UPDATE = 'bingo/products/UPDATE';
const REMOVE = 'bingo/products/REMOVE';

// Action Creators
export const loadProducts = (products) => ({type: LOAD, payload: products});
export const createProduct = (product) => ({type: CREATE, payload: product});
export const updateProduct = (product) => ({type: UPDATE, payload: product});
export const removeProduct = (product) => ({type: REMOVE, payload: product});

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