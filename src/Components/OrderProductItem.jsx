import React from 'react';
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "material-ui";
import AddIcon from 'material-ui-icons/Add'
import SubIcon from 'material-ui-icons/Remove'

/**
 * Component: Order Product Item
 * @param name {string}
 * @param price {number}
 * @param amount {number}
 * @param onAmountChanged {function(number): void}
 * @returns {React.Component}
 * @constructor
 */
const OrderProductItem = ({name, price, amount, onAmountChanged}) => (
    <ListItem>
        <ListItemText
            primary={name}
            secondary={`¥ ${price}` + (amount > 0 ? ` ×  ${amount}` : '')}
        />
        <ListItemSecondaryAction>
            {
                amount > 0 ?
                    <IconButton
                        onClick={() => onAmountChanged(Math.max(amount - 1, 0))}>
                        <SubIcon/>
                    </IconButton>
                    : null
            }
            <IconButton onClick={() => onAmountChanged(amount + 1)}>
                <AddIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

export default OrderProductItem;