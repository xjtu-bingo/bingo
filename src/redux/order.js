/**
 * Current Order Status
 */

const NEW = 'bingo/order/NEW';
const SET = 'bingo/order/SET';
const INC = 'bingo/order/INC';
const DEC = 'bingo/order/DEC';
const DEL = 'bingo/order/DEL';
const SET_TOTAL = 'bingo/order/SET_TOTAL';

export const newOrder = () => ({type: NEW});
export const setOrder = ({id, amount}) => ({type: SET, payload: {id, amount}});
export const incOrderProduct = (id) => ({type: INC, payload: id});
export const decOrderProduct = (id) => ({type: DEC, payload: id});
export const delOrderProduct = (id) => ({type: DEL, payload: id});
export const setTotal = (total) => ({type: SET_TOTAL, payload: total});

const reducer = (state = {}, action) => {
    switch (action.type) {
        case NEW:
            return {};
        case SET:
            return Object.assign({}, state, {[action.payload.id]: action.payload.amount});
        case INC:
            return Object.assign({}, state, {[action.payload]: ~~state[action.payload] + 1});
        case DEC: {
            let res = Object.assign({}, state, {[action.payload]: Math.max(0, ~~state[action.payload] - 1)});
            if (res[action.payload] === 0) {
                delete res[action.payload];
            }
            return res;
        }
        case DEL: {
            let res = Object.assign({}, state);
            delete res[action.payload];
            return res;
        }
        case SET_TOTAL:
            return Object.assign({}, state, {total: action.payload});
        default:
            return state;
    }
};

export default reducer;