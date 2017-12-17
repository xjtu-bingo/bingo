import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, {ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import {FormControl, Input, InputLabel, MenuItem, Select} from "material-ui";
import DatePicker from './Components/DatePicker'

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    input: {
        margin: 10
        ,
    },
    formControl: {
        margin: 'auto',
        width: 400,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class RegisterPage extends React.Component {
    state = {
        name: '',
        phoneNumber: '',
        cardNumber: '',
        age: '',
        amount: '',
    };

    handleNameChange = event => {
        this.setState({name: event.target.value});
    };

    handlePhoneNumberChange = event => {
        this.setState({phoneNumber: event.target.value});
    };

    handleCardNumberChange = event => {
        this.setState({cardNumber: event.target.value});
    };

    handleAgeChange = event => {
        this.setState({age: event.target.value});
    };

    handleAmountChange = event => {
        this.setState({amount: event.target.value});
    };
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onRequestClose={this.props.onRequestClose}
                    transition={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.props.onRequestClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                新会员注册
                            </Typography>
                            <Button color="contrast" onClick={this.props.onRequestClose}>
                                注册
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>姓名</InputLabel>
                                <Input
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>电话</InputLabel>
                                <Input
                                    id="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.handlePhoneNumberChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>卡号</InputLabel>
                                <Input
                                    id="cardNumber"
                                    value={this.state.cardNumber}
                                    onChange={this.handleCardNumberChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>充值</InputLabel>
                                <Input
                                    id="amount"
                                    value={this.state.cardNumber}
                                    onChange={this.handleAmountChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>性别</InputLabel>
                                <Select
                                    value={this.state.age}
                                    onChange={this.handleAgeChange}
                                    input={<Input name="gender" id="genderSelect"/>}
                                >
                                    <MenuItem value='female'>女</MenuItem>
                                    <MenuItem value='male'>男</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <DatePicker/>
                            </FormControl>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(RegisterPage);