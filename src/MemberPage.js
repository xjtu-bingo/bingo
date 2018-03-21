import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import EntranceButton from "./components/EntranceButton";

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

    state = {
        id: 0,
        display: false,
        registerPageOpen: false,
        topUpPageOpen: false,
    };

    // handleMemberSearchOpen = () => {
    //     this.setState({open: true})
    // };
    // handleMemberSearchClose = () => {
    //     this.setState({open: false})
    // };


    handleRegisterPageOpen = () => {
        this.setState({registerPageOpen: true});
    };

    handleRegisterPageOnRequestClose = () => {
        this.setState({
            registerPageOpen: false,
        });
    };

    handleRegisterPageRequestClose = (name, phoneNumber, cardNumber, amount, gender, birthday) => {
        let {dispatch} = this.props;
        this.setState({registerPageOpen: false, id: this.state.id + 1});
        dispatch({
            type: "NEW/MEMBER",
            payload: {
                id: this.state.id,
                name: name,
                phoneNumber: phoneNumber,
                cardNumber: cardNumber,
                amount: amount,
                gender: gender,
                birthday: birthday
            },
        });
        console.log(name + birthday + gender);
    };

    handleTopUpPageOpen = () => {
        this.setState({topUpPageOpen: true});
    };

    handleMemberRecharge = (amount, id) => {
        console.log(amount);
        let {dispatch} = this.props;
        dispatch({
            type: "MEMBER/RECHARGE",
            payload: {id: id, amount: amount},
        })
    };

    handleTopUpPageRequestClose = () => {
        this.setState({topUpPageOpen: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <EntranceButton
                    title="会员注册"
                    width={450}
                    imageUrl={'images/bingo-logo.jpg'}
                    onClick={this.handleRegisterPageOpen}
                />
                <EntranceButton
                    title="会员充值"
                    width={450}
                    imageUrl={'images/bingo-logo.jpg'}
                    onClick={this.handleTopUpPageOpen}
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