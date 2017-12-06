import React from 'react';
import PropTypes from 'prop-types';
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
import {FormControl, Input, InputLabel} from "material-ui";

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
        marginLeft: 600,
        width: 400,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        name: '',
        phoneNumber: '',
    };

    handleNameChange = event => {
        this.setState({name: event.target.value});
    };
    handlePhoneNumberChange = event => {
        this.setState({name: event.target.value});
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
                                保存
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="name">姓名</InputLabel>
                                <Input
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="phoneNumber">电话</InputLabel>
                                <Input
                                    id="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.handlePhoneNumberChange}
                                />
                            </FormControl>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);