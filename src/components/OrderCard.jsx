import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import {OrderedDetailTable} from "./OrderDetailTable"
import {Avatar} from "material-ui";


const styles = theme => ({
    card: {
        minWidth: 275,
        marginTop: '1em'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

const OrderCard = ({classes, order, actions}) => {
    let member = order.member;
    let avatar, title;
    if (member) {
        avatar = member.name.slice(0, 1);
        title = member.name;
    } else {
        avatar = '匿';
        title = '订单';
    }
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>{avatar}</Avatar>
                }
                title={title}
                subheader={order.date}
            />
            <CardContent>
                <OrderedDetailTable data={order.details}/>
            </CardContent>
            <CardActions>{actions}</CardActions>
        </Card>
    );
};


export default withStyles(styles)(OrderCard);