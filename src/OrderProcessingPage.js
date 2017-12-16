import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import OrderCard from './Components/Card'
import PaymentSelect from "./Components/PaymentSelect"


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
    },
});

class OrderProcessingPage extends React.Component {
    state = {
        open: false,
        selectedValue: PaymentWays[1],
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = value => {
        this.setState({selectedValue: value, open: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Paper className={classes.paper}>待付款订单</Paper>
                        {this.props.untreatedOrder.map((order, i) => (<OrderCard data={order}
                                                                                 actionName="付  款"
                                                                                 handleAction={this.handleClickOpen}/>))}
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>待制作订单</Paper>
                        <OrderCard data={this.props.paidOrder}
                                   actionName="已制作"/>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>已完成订单</Paper>
                        <OrderCard data={this.props.finishedOrder}/>
                    </Grid>
                    <PaymentSelect
                        selectedValue={this.state.selectedValue}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                        paymentWays={PaymentWays}
                    />
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(OrderProcessingPage);