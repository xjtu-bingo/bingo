import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Grid, Paper} from "material-ui";
import OrderDetail from './OrderDetailTable'
import Menu from './Menu';
import SnackBar from './Components/SnackBar'

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

class VerticalLinearStepper extends React.Component {
    state = {
        orderCreatedSnackBarOpen: false,
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

    render() {
        const {classes} = this.props;

        let order = [{name: "蜂蜜柠檬茶", price: 6, amount: 1}, {name: '热可可', price: 7, amount: 2}];
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={8}>
                        <Paper>
                            <Menu/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <OrderDetail
                                data={order}/>
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

export default withStyles(styles)(VerticalLinearStepper);