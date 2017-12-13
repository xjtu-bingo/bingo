import React from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText,} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import MenuItem from './MenuItem'

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
    };

    render() {
        const {classes} = this.props;
        const {dense} = this.state;

        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} md={2}>

                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Typography type="title" className={classes.title}>
                            类别
                        </Typography>
                        <div className={classes.demo}>
                            <List dense={dense}>
                                <ListItem button>
                                    <ListItemText primary="奶茶"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="奶绿"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="果茶"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="牛奶"/>
                                </ListItem>
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={8} md={5}>
                        <Typography type="title" className={classes.title}>
                            菜单
                        </Typography>
                        <div className={classes.demo}>
                            <List dense={dense}>
                                <MenuItem name="原味奶茶" price={6}/>
                                <MenuItem name="红豆奶茶" price={7}/>
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(InteractiveList);