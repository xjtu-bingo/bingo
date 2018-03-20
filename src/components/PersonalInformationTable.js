import React from 'react';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {

    },
});

function BasicTable(props) {
    const {classes, onClick, tableSelected, members} = props;

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>姓名</TableCell>
                    <TableCell padding="none">性别</TableCell>
                    <TableCell padding="none">电话</TableCell>
                    <TableCell padding="none">卡号</TableCell>
                    <TableCell padding="none">生日</TableCell>
                    <TableCell padding="none">余额</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {members.map((n, i) => {
                    return (
                        <TableRow selected={n.id === tableSelected} key={n.id}
                                  onClick={() => onClick(n.id, n.name, n.amount)}>
                            <TableCell>{n.name}</TableCell>
                            <TableCell padding="none">{n.gender}</TableCell>
                            <TableCell padding="none">{n.phoneNumber}</TableCell>
                            <TableCell padding="none">{n.cardNumber}</TableCell>
                            <TableCell padding="none">{n.birthday}</TableCell>
                            <TableCell padding="none">{n.amount}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}


export default withStyles(styles)(BasicTable);