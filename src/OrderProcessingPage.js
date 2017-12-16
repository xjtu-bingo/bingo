import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import OrderCard from './Components/Card'

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

function AutoGrid(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs>
                    <Paper className={classes.paper}>待付款订单</Paper>
                    <OrderCard data={[{name: "星冰乐", price: 10, amount: 2}, {name: "keke", price: 20, amount: 3}]}/>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>待制作订单</Paper>
                    <OrderCard data={[{name: "星冰乐", price: 10, amount: 2}, {name: "keke", price: 20, amount: 3}]}/>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>已完成订单</Paper>
                    <OrderCard data={[{name: "星冰乐", price: 10, amount: 2}, {name: "keke", price: 20, amount: 3}]}/>
                </Grid>
            </Grid>
        </div>
    );
}


export default withStyles(styles)(AutoGrid);