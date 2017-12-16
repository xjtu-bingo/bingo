import React from 'react';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const OrderDetailTable = ({data}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>品名</TableCell>
                <TableCell numeric>单价</TableCell>
                <TableCell numeric>数量</TableCell>
                <TableCell numeric>总价</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                data.map(order => (
                    <TableRow key={order.id}>
                        <TableCell>{order.name}</TableCell>
                        <TableCell numeric>{order.price}</TableCell>
                        <TableCell numeric>{order.amount}</TableCell>
                        <TableCell numeric>{order.price * order.amount}</TableCell>
                    </TableRow>
                ))
            }
            <TableRow>
                <TableCell>总计</TableCell>
                <TableCell numeric>N/A</TableCell>
                <TableCell numeric>{data.reduce((a, b) => a + b.amount, 0)}</TableCell>
                <TableCell numeric>{data.reduce((a, b) => a + b.price * b.amount, 0)}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

export default OrderDetailTable;