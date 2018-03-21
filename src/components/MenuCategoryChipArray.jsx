import * as React from "react";
import {withStyles} from "material-ui/styles/index";
import {Chip} from "material-ui";

const MenuCategoryChipArray = ({data, onClick, classes}) => (
    <div className={classes.root}>
        {
            data.map((v, i) => (
                <Chip className={classes.chip} key={i} label={v} onClick={() => onClick && onClick(i)}/>
            ))
        }
    </div>
);

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

export default withStyles(styles)(MenuCategoryChipArray);