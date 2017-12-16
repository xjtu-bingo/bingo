import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: theme.spacing.unit * 14,
        right: theme.spacing.unit * 4

    },
});

function FloatingActionButtons(props) {
    const {classes} = props;
    return (
        <div>
            <Button fab color="accent" aria-label="edit" className={classes.button}>
                <ModeEditIcon/>
            </Button>
        </div>
    );
}

FloatingActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);