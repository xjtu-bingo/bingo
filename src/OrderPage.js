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
        width: '90%',
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

    handleNextAndSnackBar = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
            orderCreatedSnackBarOpen: true,
        })
    };

    handleOrderCreatedSnackBaeClose = () => {
        this.setState({
            orderCreatedSnackBarOpen: false
        })
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'PRODUCT/LOAD',
            payload: [
                {
                    category: '奶茶',
                    items: [
                        {
                            id: 'A',
                            name: '原味奶茶',
                            price: 6
                        },
                        {
                            id: 'B',
                            name: '啤酒',
                            price: 4
                        }
                    ]
                },
                {
                    category: '奶绿',
                    items: [
                        {
                            id: 'C',
                            name: '原味奶绿',
                            price: 7
                        },
                        {
                            id: 'D',
                            name: '绿啤酒',
                            price: 5
                        },
                        {
                            id: 'E',
                            name: '草原',
                            price: 1
                        }
                    ]
                }
            ]
        })
    }

    render() {
        const {classes, menu} = this.props;

        // let order = [{name: "蜂蜜柠檬茶", price: 6, amount: 1}, {name: '热可可', price: 7, amount: 2}];
        let items = this.state.order.items;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs>
                        <Paper>
                            <Menu data={menu}/>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper>
                            <OrderDetail
                                data={items}/>
                            <Button raised color="primary" className={classes.action}
                                    onClick={this.handleNextAndSnackBar}>确定下单</Button>
                            <Button raised color="accent" className={classes.action}>取消订单</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <SnackBar open={this.state.orderCreatedSnackBarOpen}
                          onRequestClose={this.handleOrderCreatedSnackBaeClose} Note="订单已创建"/>
            </div>
        );
    }
}


const selector = (state) => ({
    menu: state.products.items
});

export default withStyles(styles)(connect(selector)(OrderPage));