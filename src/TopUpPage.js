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
import {FormControl, Input, InputLabel} from "material-ui";
import PersonalInformationTable from './Components/PersonalInformationTable';
import MemberRechargeDialog from './Components/MemberRechargeDialog';

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

class TopUpPage extends React.Component {
    state = {
        personalInformation: '',
        memberRechargeDialogOpen: false,
        memberID: '',
        memberName: '',
    };

    handlePersonalInformationChange = event => {
        this.setState({name: event.target.value});
    };

    handleMemberRechargeDialogOpen = (i, name) => {
        this.setState({
            memberRechargeDialogOpen: true,
            memberID: i,
            memberName: name,
        });
    };

    handleMemberRechargeDialogClose = () => {
        this.setState({memberRechargeDialogOpen: false});
    };

    handleMemberRecharge = (amount) => {
        console.log(amount);
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
                                会员充值
                            </Typography>
                            <Button color="contrast" onClick={this.props.onRequestClose}>
                                充 值
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>个人信息</InputLabel>
                                <Input
                                    id="personalInformation"
                                    value={this.state.personalInformation}
                                    onChange={this.handlePersonalInformationChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <PersonalInformationTable onClick={this.handleMemberRechargeDialogOpen}/>
                            <MemberRechargeDialog open={this.state.memberRechargeDialogOpen}
                                                  onRequestClose={this.handleMemberRechargeDialogClose}
                                                  name={this.state.memberName}
                                                  memberRecharge={this.handleMemberRecharge}/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(TopUpPage);