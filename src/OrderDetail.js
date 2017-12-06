import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function BasicTable(props) {
    const {classes, data} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>品名</TableCell>
                        <TableCell numeric>单价</TableCell>
                        <TableCell numeric>数量</TableCell>
                        <TableCell numeric>总价</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((order, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>{order.name}</TableCell>
                                <TableCell numeric>{order.price}</TableCell>
                                <TableCell numeric>{order.amount}</TableCell>
                                <TableCell numeric>{order.price * order.amount}</TableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow>
                        <TableCell>总计</TableCell>
                        <TableCell numeric>N/A</TableCell>
                        <TableCell numeric>{data.reduce((a, b) => a + b.amount, 0)}</TableCell>
                        <TableCell numeric>{data.reduce((a, b) => a + b.price * b.amount, 0)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

BasicTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);