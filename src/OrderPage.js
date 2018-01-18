import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Grid, Paper} from "material-ui";
import OrderDetail from './OrderDetailTable'
import Menu from './Menu';
import SnackBar from './Components/SnackBar'
import {connect} from "react-redux";

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
        padding: theme.spacing.unit * 3, // TODO: See TODO note on Stepper
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
        order: {
            items: []
        }
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

    handleAmountChange = (i, j, k) => {
        let {menu, order, dispatch} = this.props;
        let product = menu[i].items[j];
        let ith = order.findIndex((v, ii) => v.name === product.name);
        let nextOrder;
        if (ith === -1) {
            nextOrder = [...order, {...product, amount: k}];
        }
        else if (k === 0) {
            nextOrder = [...order];
            nextOrder.splice(ith, 1);
        } else {
            nextOrder = [...order];
            nextOrder[ith] = {...order[ith], amount: k};
        }
        dispatch({
            type: "ORDER/EDIT",
            payload: nextOrder
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
        const {classes, menu, order} = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs>
                        <Paper>
                            <Menu data={menu} handleAmountChange={this.handleAmountChange}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <OrderDetail
                                data={order}/>
                            {
                                this.props.order.length > 0 ?
                                    <div>
                                        <Button raised color="primary" className={classes.action}
                                                onClick={this.handleOrderAndSnackBar}>确定下单</Button>
                                        <Button raised color="accent" className={classes.action}
                                                onClick={this.handleOrderCanceled}>取消订单</Button>
                                    </div> : null
                            }

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

const selector = (state) => ({
    menu: foldMenu(state.products.items, state.orders.curItems),
    order: state.orders.curItems,

});

export default withStyles(styles)(connect(selector)(OrderPage));