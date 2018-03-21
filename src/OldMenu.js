import React from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText,} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import OrderProductItem from "./components/OrderProductItem";
import MenuCategoryChipArray from "./components/MenuCategoryChipArray";

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        background: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});


class InteractiveList extends React.Component {
    state = {
        dense: false,
        category: 0,
        amount: 0,
    };

    render() {
        const {classes, data, handleAmountChange} = this.props;
        const {dense, category} = this.state;
        const categories = data.map(v => v.category);

        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <MenuCategoryChipArray data={categories} onClick={(i) => this.setState({category: i})}/>
                    </Grid>
                    <Grid item xs={12} md={2}>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Typography type="title" className={classes.title}>
                            类别
                        </Typography>
                        <div className={classes.demo}>
                            <List dense={dense}>
                                {data.map((v, i) => (
                                    <ListItem button key={i} onClick={() => this.setState({category: i})}>
                                        <ListItemText primary={v.category}/>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <Typography type="title" className={classes.title}>
                            菜单
                        </Typography>
                        <div className={classes.demo}>
                            <List dense={dense}>
                                {
                                    category < data.length ?
                                        data[category].items.map((v, i) => (
                                            <OrderProductItem key={i} name={v.name} price={v.price}
                                                              amount={v.amount || 0}
                                                              onAmountChanged={(amount) => handleAmountChange(category, i, amount)}/>))
                                        : null
                                }
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(InteractiveList);