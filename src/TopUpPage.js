import React from 'react';
import {withStyles} from 'material-ui/styles';
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
        width: '30%',
    },
    informationTableControl: {
        margin: 'auto',
        width: '50%',
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class TopUpPage extends React.Component {
    state = {
        personalInformation: '',
        memberRechargeDialogOpen: false,
        memberName: '',
        tableSelectedMemberID: '',
        memberAmount: 0,
        rechargeAmount: '',
    };

    handlePersonalInformationChange = event => {
        this.setState({personalInformation: event.target.value});
    };

    handleMemberRechargeDialogOpen = (i, name, amount) => {
        this.setState({
            memberRechargeDialogOpen: true,
            memberName: name,
            memberAmount: amount,
            tableSelectedMemberID: i,
        });
    };

    handleMemberRechargeDialogClose = () => {
        this.setState({memberRechargeDialogOpen: false, rechargeAmount: ''});
    };

    handleMemberRecharge = (amount) => {
        console.log(typeof amount);
        console.log(typeof this.state.memberAmount);
        if (Number(this.state.memberAmount) < 0) {
            alert("充值金额不能为负数")
        } else {
            this.props.handleMemberRecharge(amount + Number(this.state.memberAmount), this.state.tableSelectedMemberID);
        }
        this.setState({memberRechargeDialogOpen: false, rechargeAmount: ''});
    };

    handleOnChange = (e) => {
        let value = e.target.value;
        if (+value >= 0 || value === '') {
            this.setState({
                rechargeAmount: value,
            });
        }
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
                            {/*<Button color="contrast" onClick={this.props.onRequestClose}>*/}
                            {/*充 值*/}
                            {/*</Button>*/}
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel>请输入查询信息</InputLabel>
                                <Input
                                    id="personalInformation"
                                    value={this.state.personalInformation}
                                    onChange={this.handlePersonalInformationChange}
                                />
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl className={classes.informationTableControl}>
                                <PersonalInformationTable onClick={this.handleMemberRechargeDialogOpen}
                                                          tableSelected={this.state.tableSelectedMemberID}
                                                          members={this.props.members}/>
                            </FormControl>

                            <MemberRechargeDialog open={this.state.memberRechargeDialogOpen}
                                                  onRequestClose={this.handleMemberRechargeDialogClose}
                                                  name={this.state.memberName}
                                                  memberRecharge={this.handleMemberRecharge}
                                                  handleOnChange={this.handleOnChange}
                                                  rechargeAmount={this.state.rechargeAmount}/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(TopUpPage);