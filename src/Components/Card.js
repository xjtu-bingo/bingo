import React from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import OrderDetail from "../OrderDetailTable"


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
                        <Button dense onClick={this.props.handleAction}>{this.props.actionName}</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}


export default withStyles(styles)(SimpleCard);