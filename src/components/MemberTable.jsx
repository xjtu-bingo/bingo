import React from 'react';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const MemberTable = ({data: members, getActions, getSummaryActions}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>卡号</TableCell>
                <TableCell>姓名</TableCell>
                <TableCell>电话</TableCell>
                <TableCell numeric>余额</TableCell>
                <TableCell>操作</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                members.map(item => (
                    <TableRow hover key={item.id}>
                        <TableCell>{item.number}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.tel}</TableCell>
                        <TableCell numeric>{item.balance}</TableCell>
                        <TableCell>
                            {
                                getActions && getActions(item)
                            }
                        </TableCell>
                    </TableRow>
                ))
            }
            <TableRow>
                <TableCell>总计 ({members.length})</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell numeric>{members.reduce((a, b) => a + b.balance, 0)}</TableCell>
                <TableCell>
                    {getSummaryActions && getSummaryActions(members)}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

export default MemberTable;