import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import OrderCard from './Components/Card'
import PaymentSelect from "./Components/PaymentSelect"
import {Button} from "material-ui";
import {connect} from "react-redux";
import MemberSearchDialog from './Components/MemberSearchDialog'


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
        indexOfOrders: 0,
        selectedValue: PaymentWays[1],
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
        this.setState({
            memberSearchDialogOpen: false,
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
        let indx = this.state.indexOfOrders;
        this.setState({selectedValue: value, open: false});
        if (this.state.selectedValue === "会员付款") {
            this.handleMemberSearchDialogOpen();
        } else {
            dispatch({type: "PAY/ORDER", payload: {index: indx, payment: value}})
        }
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
                                                <Button>撤销</Button>
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
                                        handleMemberSearchDialogOnClose={this.handleMemberSearchDialogOnClose}
                                        handleMemberSearchDialogClose={this.handleMemberSearchDialogClose}/>
                </Grid>
            </div>
        );
    }
}

const selector = (state) => ({
    order: state.orders.items,
    paidOrder: state.orders.paidItems,
    finishedOrder: state.orders.finishedItems,
});

export default withStyles(styles)(connect(selector)(OrderProcessingPage));