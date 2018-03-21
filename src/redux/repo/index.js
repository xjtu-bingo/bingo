import {combineReducers} from "redux";
import products from "./products";
import orders from "./orders";

const reducer = combineReducers({
    products,
    orders
});

export default reducer;