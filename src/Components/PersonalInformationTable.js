import React from 'react';
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
        maxWidth: 600,
    },
});

let id = 0;

function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return {id, name, calories, fat, carbs, protein};
}

const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function BasicTable(props) {
    const {classes, onClick} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>姓名</TableCell>
                        <TableCell>性别</TableCell>
                        <TableCell>电话</TableCell>
                        <TableCell>卡号</TableCell>
                        <TableCell>生日</TableCell>
                        <TableCell>余额</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (
                            <TableRow key={n.id} onClick={() => onClick(n.id, n.name)}>
                                <TableCell>{n.name}</TableCell>
                                <TableCell>{n.calories}</TableCell>
                                <TableCell>{n.fat}</TableCell>
                                <TableCell>{n.carbs}</TableCell>
                                <TableCell>{n.protein}</TableCell>
                                <TableCell>{n.protein}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}


export default withStyles(styles)(BasicTable);