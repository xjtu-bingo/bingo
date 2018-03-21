import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import EntranceButton from "../components/EntranceButton";
import {isMemberSignUpOpen, isMemberTopUpOpen} from "../redux/switches";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    }
});

class MemberPage extends Component {

    render() {
        const {classes, dispatch} = this.props;

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
                {/*<MemberSearchDialog open={this.state.open} onRequestClose={this.handleMemberSearchClose}/>*/}
                {/*<RegisterPage open={this.state.registerPageOpen} onRequestClose={this.handleRegisterPageOnRequestClose}*/}
                {/*RegisterRequestClose={this.handleRegisterPageRequestClose}/>*/}
                {/*<TopUpPage open={this.state.topUpPageOpen} onRequestClose={this.handleTopUpPageRequestClose}*/}
                {/*members={this.props.members}*/}
                {/*handleMemberRecharge={this.handleMemberRecharge}/>*/}
            </div>
        );
    }
}

const selector = (state) => ({
    members: state.members.member,
});

export default withStyles(styles)(connect(selector)(MemberPage));