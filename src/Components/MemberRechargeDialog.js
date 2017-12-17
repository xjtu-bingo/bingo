import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
} from "material-ui";

import {withStyles} from 'material-ui/styles'

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
    },
    dialog: {
        width: 1000,
    }
});

class MemberRechargeDialog extends React.Component {

    state = {
        amount: '',
    };

    handleOnChange = (e) => {
        this.setState({
            amount: e.target.value,
        })
    };

    render() {
        const {classes, open, onRequestClose, name, memberRecharge} = this.props;
        return (
            <div>
                <Dialog open={open} onRequestClose={onRequestClose}>
                    <DialogContent>
                        <DialogContentText>
                            {name}
                        </DialogContentText>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel>请输入需要充值的金额</InputLabel>
                            <Input
                                value={this.state.amount}
                                type="number"
                                onChange={this.handleOnChange}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                className={classes.dialog}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onRequestClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={() => memberRecharge(this.state.amount)} color="primary">
                            充值
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(MemberRechargeDialog);