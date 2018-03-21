import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Grid, Paper} from "material-ui";
import OrderDetail from '../components/OrderDetailTable'
import Menu from './Menu';
import SnackBar from '../components/SnackBar'
import {connect} from "react-redux";
import {decOrderProduct, delOrderProduct, incOrderProduct, newOrder} from "../redux/order";
import {Delete, Send} from "material-ui-icons";

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

class OrderPage extends React.Component {
    state = {
        orderCreatedSnackBarOpen: false,
    };

    handleOrderAndSnackBar = () => {
        this.setState({
            orderCreatedSnackBarOpen: true,
        });
        this.props.dispatch({
            type: "NEW_ORDER",
            payload: {orders: this.props.order, total: caculateOrderToalCost(this.props.order)},
        })
    };


    handleOrderCreatedSnackBaeClose = () => {
        this.setState({
            orderCreatedSnackBarOpen: false
        })
    };


    handleOrderCanceled = () => {
        this.props.dispatch({
            type: "ORDER/CANCELED",
            payload: ""
        })
    }
    ;

    render() {
        const {classes, products, order, dispatch} = this.props;

        const appendix = (
            <div>
                <Button variant="raised" color="primary" className={classes.action}
                        onClick={() => {
                            dispatch({
                                type: "NEW_ORDER",
                                payload: {
                                    orders: order,
                                    total: order.reduce((a, b) => a + b.amount * b.price, 0)
                                },
                            });
                            dispatch(newOrder());
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
                <SnackBar open={this.state.orderCreatedSnackBarOpen}
                          onRequestClose={this.handleOrderCreatedSnackBaeClose} Note="订单已创建"/>
            </div>
        );
    }
}

function caculateOrderToalCost(order) {
    let total = 0;
    for (let i = 0; i < order.length; i++) {
        total = total + order[i].amount * order[i].price;
    }
    return total;
}

function addAmount(tempArray, order) {
    return tempArray.map((a, i) => {
        let ith = order.findIndex((v, ii) => v.name === a.name);
        if (ith === -1) {
            return {...a, amount: 0};
        } else {
            return {...a, amount: order[ith].amount};
        }
    })
}

function foldMenu(tempMenu, order) {
    let temp = addAmount(tempMenu, order);
    let array = [];
    for (let i = 0; i < temp.length; i++) {
        let ith = array.findIndex((ar, ii) => ar === temp[i].category);
        if (ith === -1) {
            array.push(temp[i].category)
        }
    }
    let FoldMenu = [];
    for (let j = 0; j < array.length; j++) {
        FoldMenu.push({category: array[j], items: [],})
    }
    for (let k = 0; k < temp.length; k++) {
        let indx = FoldMenu.findIndex((menu, i) =>
            menu.category === temp[k].category
        );

        FoldMenu[indx].items.push(temp[k]);
    }
    return FoldMenu;
}

function ToArray(obj) {
    let res = [];
    for (let key in obj) {
        res.push(obj[key]);
    }
    return res;
}

const selector = (state) => ({
    menu: foldMenu(ToArray(state.repo.products.items), state.orders.curItems),
    order: Object.keys(state.order).map(id => ({...state.repo.products[id], amount: state.order[id]})),
    products: state.repo.products
});

export default connect(selector)(withStyles(styles)(OrderPage));