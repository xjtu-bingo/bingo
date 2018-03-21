import {combineReducers} from "redux";
import products from "./products";
import orders from "./orders";
import members from "./members";

const reducer = combineReducers({
    products,
    orders,
    members
});

export default reducer;