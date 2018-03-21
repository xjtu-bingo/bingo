import React from 'react';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import {IconButton} from "material-ui";
import {Add, Delete, Remove} from "material-ui-icons";

export const OrderedDetailTable = ({data: orderDetail}) => (
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
                orderDetail.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell numeric>{item.price}</TableCell>
                        <TableCell numeric>{item.amount}</TableCell>
                        <TableCell numeric>{item.price * item.amount}</TableCell>
                    </TableRow>
                ))
            }
            <TableRow>
                <TableCell>总计</TableCell>
                <TableCell numeric>N/A</TableCell>
                <TableCell numeric>{orderDetail.reduce((a, b) => a + b.amount, 0)}</TableCell>
                <TableCell numeric>{orderDetail.reduce((a, b) => a + b.price * b.amount, 0)}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);


const OrderingDetailTable = ({data: orderDetail, onIncProduct, onDelProduct, onDecProduct, onDelete}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>品名</TableCell>
                <TableCell numeric>单价</TableCell>
                <TableCell numeric>数量</TableCell>
                <TableCell numeric>总价</TableCell>
                <TableCell>操作</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                orderDetail.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell numeric>{item.price}</TableCell>
                        <TableCell numeric>{item.amount}</TableCell>
                        <TableCell numeric>{item.price * item.amount}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => onDelProduct && onDelProduct(item)}>
                                <Delete/>
                            </IconButton>
                            <IconButton onClick={() => onIncProduct && onIncProduct(item)}>
                                <Add/>
                            </IconButton>
                            <IconButton onClick={() => onDecProduct && onDecProduct(item)}>
                                <Remove/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))
            }
            <TableRow>
                <TableCell>总计</TableCell>
                <TableCell numeric>N/A</TableCell>
                <TableCell numeric>{orderDetail.reduce((a, b) => a + b.amount, 0)}</TableCell>
                <TableCell numeric>{orderDetail.reduce((a, b) => a + b.price * b.amount, 0)}</TableCell>
                <TableCell>
                    <IconButton onClick={() => onDelete && onDelete()}>
                        <Delete/>
                    </IconButton>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

export default OrderingDetailTable;