import * as React from "react";
import {ListItem, ListItemIcon, ListItemText} from "material-ui/List/index";

/**
 * Item in Navigate Bar
 * @param icon
 * @param onClick
 * @param text
 * @param disabled
 * @returns {*}
 * @constructor
 */
const NavigateItem = ({icon, onClick, text, disabled = false}) => (
    <ListItem button disabled={disabled} onClick={onClick}>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText primary={text}/>
    </ListItem>
);

export default NavigateItem;