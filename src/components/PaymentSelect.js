import React from 'react';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import List, {ListItem, ListItemAvatar, ListItemText} from 'material-ui/List';
import Dialog, {DialogTitle} from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import blue from 'material-ui/colors/blue';

const styles = {
    avatar: {
        background: blue[100],
        color: blue[600],
    },
};

class PaymentSelect extends React.Component {
    handleRequestClose = () => {
        this.props.onRequestClose("none");
    };

    handleListItemClick = value => {
        this.props.onRequestClose(value);
    };

    render() {
        const {classes, onRequestClose, selectedValue, paymentWays, ...other} = this.props;

        return (
            <Dialog onRequestClose={this.props.handlePaymentRequestClose} {...other} >
                <DialogTitle style={{width: 300}}>选择支付方式</DialogTitle>
                <div>
                    <List>
                        {paymentWays.map((ways, i) => (
                            <ListItem button onClick={() => this.handleListItemClick(ways)} key={i}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={ways}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}


export default withStyles(styles)(PaymentSelect);

// class SimpleDialogDemo extends React.Component {
//     state = {
//         open: false,
//         selectedValue: emails[1],
//     };
//
//     handleClickOpen = () => {
//         this.setState({
//             open: true,
//         });
//     };
//
//     handleRequestClose = value => {
//         this.setState({ selectedValue: value, open: false });
//     };
//
//     render() {
//         return (
//             <div>
//                 <Typography type="subheading">Selected: {this.state.selectedValue}</Typography>
//                 <br />
//                 <Button onClick={this.handleClickOpen}>Open simple dialog</Button>
//                 <SimpleDialogWrapped
//                     selectedValue={this.state.selectedValue}
//                     open={this.state.open}
//                     onRequestClose={this.handleRequestClose}
//                 />
//             </div>
//         );
//     }
// }
//
// export default SimpleDialogDemo;