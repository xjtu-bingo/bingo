import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import OrderDetail from "../OrderDetailTable"
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

class OrderCard extends React.Component {
    render() {
        const {classes, data, actions} = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            匿
                        </Avatar>
                    }
                    title="会员名"
                    subheader="订单时间"
                />
                <CardContent>
                    <OrderDetail data={data}/>
                </CardContent>
                <CardActions>{actions}</CardActions>
            </Card>
        );
    }
}

const Order = ({classes, order}) => (
    <Card className={classes.card}>
        <CardHeader
            avatar={
                <Avatar className={classes.avatar}>匿</Avatar>
            }
            title={order.member}
            subheader={order.date}
        />
        <CardContent>
            <OrderDetail data={order.details}/>
        </CardContent>
    </Card>
);

export default withStyles(styles)(OrderCard);