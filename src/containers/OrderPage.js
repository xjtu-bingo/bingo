import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Fade, FormControlLabel, Grid, InputAdornment, Paper, Switch, TextField} from "material-ui";
import OrderDetail from '../components/OrderDetailTable'
import Menu from './Menu';
import {connect} from "react-redux";
import {decOrderProduct, delOrderProduct, incOrderProduct, newOrder} from "../redux/order";
import {Delete, Send} from "material-ui-icons";
import {createOrder} from "../redux/mutations";
import {IsOrderTotalOverride, OrderNote, OrderTotal} from '../redux/switches';

const styles = theme => ({
    root: {
        width: '100%',
    },
    action: {
        margin: '2em'
    },
    buttonOne: {
        marginRight: '18%',
    },
    buttonTwo: {
        marginRight: '10%',
    },
    buttonThree: {
        marginRight: '48%',
    },
    actionsContainer: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    resetContainer: {
        marginTop: 0,
        padding: theme.spacing.unit * 3, // TODO: See TODO note on OrderPage
    },
    formControl: {
        marginTop: '2em',
        paddingLeft: '1em'
    },
    memberSearch: {
        display: 'none'
    },
    orderAppendix: {
        padding: '1em'
    }
});

const OrderPage = ({classes, products, note, total, isTotalOverride, order, dispatch}) => {
    const notes = [note];

    if (isTotalOverride) {
        notes.push(`指定总价：￥${total}`);
    }

    const appendix = (
        <div className={classes.orderAppendix}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isTotalOverride}
                        onChange={e => dispatch(IsOrderTotalOverride.setter(e.target.checked))}
                        color="primary"
                    />
                }
                label="指定总价"
            />
            <Fade in={isTotalOverride} mountOnEnter unmountOnExit>
                <TextField
                    label="总价"
                    type="number"
                    helperText="实际结算时将按照指定的总价支付"
                    fullWidth
                    value={total}
                    onChange={e => dispatch(OrderTotal.setter(parseFloat(e.target.value)))}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">￥</InputAdornment>
                    }}
                    inputProps={{
                        min: 0
                    }}
                />
            </Fade>

            <TextField
                label="备注"
                helperText="e.g. 少加糖 / 多加珍珠"
                fullWidth
                value={note}
                onChange={(e) => dispatch(OrderNote.setter(e.target.value))}
                multiline margin="normal"
            />
            <Button variant="raised" color="primary" className={classes.action}
                    onClick={() => {
                        dispatch(createOrder({
                            memberId: null,
                            details: order,
                            total: isTotalOverride ? total : order.reduce((a, b) => a + b.amount * b.price, 0),
                            note: notes.join('\n')
                        }));
                        dispatch(IsOrderTotalOverride.setFalse());
                        dispatch(OrderNote.setter(""));
                        dispatch(OrderTotal.setter(0));
                    }}>
                <Send/>
                确定下单
            </Button>
            <Button variant="raised" color="secondary" className={classes.action}
                    onClick={() => dispatch(newOrder())}>
                <Delete/>
                取消订单
            </Button>
        </div>
    );
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs>
                    <Paper>
                        <Menu products={products}
                              onProductClick={product => dispatch(incOrderProduct(product.id))}/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper>
                        <OrderDetail
                            data={order}
                            onIncProduct={product => dispatch(incOrderProduct(product.id))}
                            onDecProduct={product => dispatch(decOrderProduct(product.id))}
                            onDelProduct={product => dispatch(delOrderProduct(product.id))}
                            onDelete={() => dispatch(newOrder())}
                        />
                        {order.length > 0 ? appendix : null}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};


const selector = (state) => ({
    order: Object.keys(state.order).map(id => ({...state.repo.products[id], amount: state.order[id]})),
    isTotalOverride: state.switches.isOrderTotalOverride,
    total: state.switches.orderTotal,
    note: state.switches.orderNote,
    products: state.repo.products,
});

export default connect(selector)(withStyles(styles)(OrderPage));