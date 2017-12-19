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

    handleMemeberSearchDialogOpen = () => {
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

    handleRequestClose = value => {
        this.setState({selectedValue: value, open: false});
    };

    render() {
        const {classes, order} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Paper className={classes.paper}>待付款订单</Paper>
                        {
                            order
                                .map((order, i) => (
                                    <OrderCard
                                        data={order}
                                        actions={
                                            [
                                                <Button onClick={(i) => this.handleClickOpen(i)}>付款</Button>,
                                                <Button>取消订单</Button>
                                            ]
                                        }
                                    />
                                ))
                        }
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>待制作订单</Paper>
                        {
                            this.props.paidOrder
                                .map((order, i) => (
                                    <OrderCard
                                        data={order}
                                        actions={
                                            [
                                                <Button>完成</Button>,
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
                            this.props.finishedOrder
                                .map((order, i) => (
                                    <OrderCard
                                        data={order}
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
                        onRequestClose={this.handleRequestClose}
                        paymentWays={PaymentWays}
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
});

export default withStyles(styles)(connect(selector)(OrderProcessingPage));