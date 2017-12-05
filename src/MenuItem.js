import React from 'react';
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "material-ui";
import AddIcon from 'material-ui-icons/Add'
import SubIcon from 'material-ui-icons/Remove'


class MenuItem extends React.Component {
    state = {
        OrderNumber: 0,
    };

    render() {
        return (
            <ListItem>
                <ListItemText
                    primary={`${this.props.name}`}
                    secondary={`¥ ${this.props.price}` + (this.state.OrderNumber > 0 ? ` ×  ${this.state.OrderNumber}` : '')}
                />
                <ListItemSecondaryAction>
                    {
                        this.state.OrderNumber > 0 ?
                            <IconButton
                                onClick={() => this.setState({OrderNumber: Math.max(this.state.OrderNumber - 1, 0)})}>
                                <SubIcon/>
                            </IconButton>

                            : null

                    }
                    <IconButton onClick={() => this.setState({OrderNumber: this.state.OrderNumber + 1})}>
                        <AddIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default MenuItem;