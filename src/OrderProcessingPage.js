import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import OrderCard from './components/OrderCard'
import PaymentSelect from "./components/PaymentSelect"
import {Button} from "material-ui";
import {connect} from "react-redux";
import MemberSearchDialog from './components/MemberSearchDialog'


const PaymentWays = ["会员支付", "支付宝", "微信", "现金"];
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '1em'
    },
});

class OrderProcessingPage extends React.Component {
    state = {
        open: false,
        memberSearchDialogOpen: false,
        indexOfOrder: 0,
        selectedValue: PaymentWays[1],
        tableSelectedMemberID: '',
        selectedMemberAmount: ''
    };

    handleMemberSearchDialogOpen = () => {
        this.setState({
            memberSearchDialogOpen: true,
        })
    };

    handleMemberSearchDialogOnClose = () => {
        this.setState({
            memberSearchDialogOpen: false,
        })
    };

    handleMemberSearchDialogClose = () => {
        let {members, dispatch} = this.props;
        this.setState({
            memberSearchDialogOpen: false,
        });
        let memberIndex = 0;
        let indx = this.state.indexOfOrder;
        for (let i = 0; i < members.length; i++) {
            if (this.state.tableSelectedMemberID === members[i].id) {
                memberIndex = i;
                break;
            }
        }
        let total = this.props.order[this.state.indexOfOrder].total;
        let memberAmount = members[memberIndex].amount;
        if (total <= memberAmount) {
            console.log("付款成功");
            dispatch({
                type: 'PAYMENT/SUCCESS',
                payload: {id: members[memberIndex].id, memberAmount: memberAmount - total}
            });
            dispatch({type: "PAY/ORDER", payload: {index: indx, payment: "会员付款"}})
        } else {
            console.log("余额不足");
        }
    };

    handleRevokeOrder = (index) => {
        let {dispatch} = this.props;
        dispatch({
            type: 'REVOKE/ORDER',
            payload: index,
        })
    };
    handleClickOpen = (index) => {
        this.setState({
            open: true,
            indexOfOrder: index,
        });
    };

    handleFinishOrder = (index) => {
        let {dispatch} = this.props;
        dispatch({
            type: 'FINISH/ORDER',
            payload: index,
        })
    };
    handleCancelOrder = (index) => {
        let {dispatch} = this.props;
        dispatch({
            type: 'CANCEL/ORDER',
            payload: index,
        })
    };
    handlePaymentRequestClose = () => {
        this.setState({
            open: false,
        })
    };
    handlePaymentSelectRequestClose = value => {
        let {dispatch} = this.props;
        let indx = this.state.indexOfOrder;
        this.setState({open: false});
        if (value === "会员支付") {
            this.handleMemberSearchDialogOpen();
        } else {
            dispatch({type: "PAY/ORDER", payload: {index: indx, payment: value}})
        }
    };

    handlePersonalInformationSelected = (id, name, amount) => {
        this.setState({
            tableSelectedMemberID: id,
            selectedMemberAmount: amount,
        })
    };

    render() {
        const {classes, order, paidOrder, finishedOrder} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Paper className={classes.paper}>待付款订单</Paper>
                        {
                            order
                                .map((order, i) => (
                                    <OrderCard
                                        data={order.orders}
                                        key={i}
                                        actions={
                                            [
                                                <Button onClick={() => this.handleClickOpen(i)}>付款</Button>,
                                                <Button onClick={() => this.handleCancelOrder(i)}>取消订单</Button>
                                            ]
                                        }
                                    />
                                ))
                        }
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>待制作订单</Paper>
                        {
                            paidOrder
                                .map((order, i) => (
                                    <OrderCard
                                        data={order.orders}
                                        actions={
                                            [
                                                <Button onClick={() => this.handleFinishOrder(i)}>完成</Button>,
                                                <Button>退款</Button>
                                            ]
                                        }
                                    />
                                ))
                        }
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>已完成订单</Paper>
                        {
                            finishedOrder
                                .map((order, i) => (
                                    <OrderCard
                                        data={order.orders}
                                        actions={
                                            [
                                                <Button onClick={() => this.handleRevokeOrder(i)}>撤销</Button>
                                            ]
                                        }
                                    />
                                ))
                        }
                    </Grid>
                    <PaymentSelect
                        selectedValue={this.state.selectedValue}
                        open={this.state.open}
                        onRequestClose={this.handlePaymentSelectRequestClose}
                        paymentWays={PaymentWays}
                        handlePaymentRequestClose={this.handlePaymentRequestClose}
                    />
                    <MemberSearchDialog open={this.state.memberSearchDialogOpen}
                                        tableSelected={this.state.tableSelectedMemberID}
                                        handleMemberSearchDialogOnClose={this.handleMemberSearchDialogOnClose}
                                        handleMemberSearchDialogClose={this.handleMemberSearchDialogClose}
                                        handlePersonalInformationSelected={this.handlePersonalInformationSelected}
                                        members={this.props.members}/>
                </Grid>
            </div>
        );
    }
}

const selector = (state) => ({
    order: state.orders.items,
    paidOrder: state.orders.paidItems,
    finishedOrder: state.orders.finishedItems,
    members: state.members.member,
});

export default withStyles(styles)(connect(selector)(OrderProcessingPage));