import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import OrderDetail from "../OrderDetailTable"
import PaymentSelect from "./PaymentSelect"

const PaymentWays = ["会员支付", "支付宝", "微信", "现金"];
const styles = theme => ({
    card: {
        minWidth: 275,
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

class SimpleCard extends React.Component {
    state = {
        open: false,
        selectedValue: PaymentWays[1],
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = value => {
        this.setState({selectedValue: value, open: false});
    };

    render() {
        const {classes, data} = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <OrderDetail data={data}/>
                    </CardContent>
                    <CardActions>
                        <Button dense onClick={this.handleClickOpen}>付 款</Button>
                    </CardActions>
                    <PaymentSelect
                        selectedValue={this.state.selectedValue}
                        open={this.state.open}
                        onRequestClose={this.handleRequestClose}
                        paymentWays={PaymentWays}
                    />
                </Card>
            </div>
        );
    }
}


export default withStyles(styles)(SimpleCard);