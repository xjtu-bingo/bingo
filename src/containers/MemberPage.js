import React from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import EntranceButton from "../components/EntranceButton";
import {isMemberSignUpOpen, isMemberTopUpOpen} from "../redux/switches";
import {Modal, Typography} from "material-ui";
import MemberSignUpForm from "../components/MemberSignUpForm";
import MemberTopUpForm from "../components/MemberTopUpForm";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

const MemberPage = ({classes, dispatch, isSignUp, isTopUp}) => {

    return (
        <div className={classes.root}>
            <EntranceButton
                title="会员注册"
                width={450}
                imageUrl={'images/bingo-logo.jpg'}
                onClick={() => dispatch(isMemberSignUpOpen.setTrue())}
            />
            <EntranceButton
                title="会员充值"
                width={450}
                imageUrl={'images/bingo-logo.jpg'}
                onClick={() => dispatch(isMemberTopUpOpen.setTrue())}
            />
            <Modal
                open={isSignUp}
                onClose={() => dispatch(isMemberSignUpOpen.setFalse())}
            >
                <div style={{
                    top: `${50}%`,
                    left: `${50}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                }} className={classes.paper}>
                    <Typography variant="display1">会员注册</Typography>
                    <MemberSignUpForm/>
                </div>
            </Modal>
            <Modal
                open={isTopUp}
                onClose={() => dispatch(isMemberTopUpOpen.setFalse())}
            >
                <div style={{
                    top: `${50}%`,
                    left: `${50}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                }} className={classes.paper}>
                    <Typography variant="display1">会员充值</Typography>
                    <MemberTopUpForm/>
                </div>
            </Modal>
            {/*<MemberSearchDialog open={this.state.open} onRequestClose={this.handleMemberSearchClose}/>*/}
            {/*<RegisterPage open={this.state.registerPageOpen} onRequestClose={this.handleRegisterPageOnRequestClose}*/}
            {/*RegisterRequestClose={this.handleRegisterPageRequestClose}/>*/}
            {/*<TopUpPage open={this.state.topUpPageOpen} onRequestClose={this.handleTopUpPageRequestClose}*/}
            {/*members={this.props.members}*/}
            {/*handleMemberRecharge={this.handleMemberRecharge}/>*/}
        </div>
    );
};


const selector = (state) => ({
    members: state.members.member,
    isSignUp: state.switches.isMemberSignUpOpen,
    isTopUp: state.switches.isMemberTopUpOpen
});

export default withStyles(styles)(connect(selector)(MemberPage));