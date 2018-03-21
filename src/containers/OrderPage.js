import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Grid, Paper} from "material-ui";
import OrderDetail from '../components/OrderDetailTable'
import Menu from './Menu';
import {connect} from "react-redux";
import {decOrderProduct, delOrderProduct, incOrderProduct, newOrder} from "../redux/order";
import {Delete, Send} from "material-ui-icons";
import {createOrder} from "../redux/mutations";

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
    }
});

const OrderPage = ({classes, products, order, dispatch}) => {
    const appendix = (
        <div>
            <Button variant="raised" color="primary" className={classes.action}
                    onClick={() => {
                        dispatch(createOrder({
                            memberId: null,
                            details: order,
                            total: order.reduce((a, b) => a + b.amount * b.price, 0),
                            note: ''
                        }));
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
    products: state.repo.products
});

export default connect(selector)(withStyles(styles)(OrderPage));