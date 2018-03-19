import React from 'react';
import {List} from "material-ui";
import OrderProductItem from "./OrderProductItem";

/**
 * Show Order Product List
 * @param orderSlice {{name: string, amount: number, price: number}[]}
 * @param onOrderChanged {function(number, number): void}
 * @returns {React.Component}
 * @constructor
 */
const OrderProductList = ({orderSlice, onOrderChanged}) => (
    <List>
        {orderSlice.map((v, i) => (<OrderProductItem name={v.name} amount={v.amount} price={v.price}
                                                     onAmountChanged={(amount) => onOrderChanged(i, amount)}/>))}
    </List>
);

export default OrderProductList;