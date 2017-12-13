import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        margin: "auto",
        width: "90%"
    }),
});

const PaperSheet = ({classes, category, children}) => {
    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography type="headline" component="h3">
                    {category}
                </Typography>
                <Typography component="p">
                    {children}
                </Typography>
            </Paper>
        </div>
    );
}



export default withStyles(styles)(PaperSheet);