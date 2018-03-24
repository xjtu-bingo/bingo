import * as React from "react";
import {withStyles} from "material-ui/styles/index";
import {Chip} from "material-ui";

const MenuCategoryChipArray = ({data, onClick, classes}) => (
    <div className={classes.root}>
        <Chip className={classes.chip} label="全部" onClick={() => onClick && onClick('')}/>
        {
            data.map((v, i) => (
                <Chip className={classes.chip} key={i} label={v} onClick={() => onClick && onClick(v)}/>
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