import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class SimpleSnackBar extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.open}
                    autoHideDuration={6000}
                    onRequestClose={this.props.onRequestClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.Note}</span>}
                    action={[
                        <Button key="undo" color="accent" dense onClick={this.props.onRequestClose}>
                            确定
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.props.onRequestClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(SimpleSnackBar);