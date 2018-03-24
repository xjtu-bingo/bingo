import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import OrderCard from '../components/OrderCard'
import {Button} from "material-ui";
import {connect} from "react-redux";
import {updateOrderMember, updateOrderStatus} from "../redux/mutations";
import {IsSelectingMember, SelectedOrderId} from "../redux/switches";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '1em'
    },
});

const OrderProcessingPage = ({classes, newOrders, paidOrders, finishedOrders, canceledOrders, dispatch}) => (
    <div className={classes.root}>
        <Grid container>
            <Grid item xs>
                <Paper className={classes.paper}>已完成订单 ({finishedOrders.length})</Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>已取消订单 ({canceledOrders.length})</Paper>
            </Grid>
        </Grid>
        <Grid container spacing={24}>
            <Grid item xs>
                <Paper className={classes.paper}>待付款订单 ({newOrders.length})</Paper>
                {
                    newOrders
                        .map(order => {
                            const actions = [
                                <Button key={0} onClick={() => {
                                    dispatch(SelectedOrderId.setter(order.id));
                                    dispatch(IsSelectingMember.setTrue());
                                }}>
                                    {order.member ? "变更会员" : "品阁会员"}
                                </Button>,
                                <Button key={1} onClick={() => dispatch(updateOrderStatus({
                                    id: order.id,
                                    status: 'PAID'
                                }))}>
                                    {order.member ? "余额支付" : "其他方式支付"}
                                </Button>,
                                <Button key={2} onClick={() => dispatch(updateOrderStatus({
                                    id: order.id,
                                    status: 'CANCELED'
                                }))}>取消订单</Button>
                            ];
                            if (order.member) {
                                actions.push(<Button key={3}
                                                     onClick={() => dispatch(updateOrderMember({orderId: order.id}))}>非会员</Button>);
                            }
                            return (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    actions={actions}
                                />
                            )
                        })
                }
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>待制作订单 ({paidOrders.length})</Paper>
                {
                    paidOrders
                        .map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                actions={
                                    [
                                        <Button key={0} onClick={() => dispatch(updateOrderStatus({
                                            id: order.id,
                                            status: 'FINISHED'
                                        }))}>完成</Button>,
                                        <Button key={1} onClick={() => dispatch(updateOrderStatus({
                                            id: order.id,
                                            status: 'NEW'
                                        }))}>退款</Button>
                                    ]
                                }
                            />
                        ))
                }
            </Grid>
        </Grid>
    </div>
);


const selector = (state) => {
    let orders = Object.values(state.repo.orders);
    let newOrders = orders.filter(order => order.status === 'NEW');
    let paidOrders = orders.filter(order => order.status === 'PAID');
    let finishedOrders = orders.filter(order => order.status === 'FINISHED');
    let canceledOrders = orders.filter(order => order.status === 'CANCELED');
    return {
        orders,
        newOrders,
        paidOrders,
        finishedOrders,
        canceledOrders
    };
};

export default withStyles(styles)(connect(selector)(OrderProcessingPage));