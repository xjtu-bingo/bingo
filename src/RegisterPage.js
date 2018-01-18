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
import DatePicker from './Components/DatePicker';
import jMoment from 'moment-jalaali';

jMoment.loadPersian({dialect: 'persian-modern', usePersianDigits: true});
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
        gender: 'male',
        amount: '',
        birthday: ''
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

    handleGenderChange = event => {
        this.setState({gender: event.target.value});
        console.log(this.state.gender)
    };

    handleAmountChange = event => {
        this.setState({amount: event.target.value});
    };

    handleBirthdayChange = (date) => {
        this.setState({
            birthday: date,
        });
    };

    render() {
        const {classes, onRequestClose, RegisterRequestClose} = this.props;
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
                            <IconButton color="contrast" onClick={onRequestClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                新会员注册
                            </Typography>
                            <Button color="contrast"
                                    onClick={() => RegisterRequestClose(this.state.name, this.state.phoneNumber, this.state.cardNumber, this.state.amount, this.state.gender, this.state.birthday)}>
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
                                    value={this.state.amount}
                                    onChange={this.handleAmountChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>性别</InputLabel>
                                <Select
                                    value={this.state.gender}
                                    onChange={this.handleGenderChange}
                                    input={<Input name="gender" id="genderSelect"/>}
                                >
                                    <MenuItem value='female'>女</MenuItem>
                                    <MenuItem value='male'>男</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <DatePicker onChange={this.handleBirthdayChange}
                                            labelFunc={date => jMoment(date).format('jYYYY/jMM/jDD')}/>
                                {
                                    console.log(this.state.birthday)
                                }
                            </FormControl>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(RegisterPage);