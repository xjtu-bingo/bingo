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
        width: '45%',
    }
});

class MemberRechargeDialog extends React.Component {

    state = {
        amount: '',
    };

    handleOnChange = (e) => {
        let value = e.target.value;
        if (+value >= 0 || value === '') {
            this.setState({
                amount: value,
            });
        }
    };

    render() {
        const {classes, open, onRequestClose, name, memberRecharge, rechargeAmount} = this.props;
        return (
            <div>
                <Dialog open={open} onRequestClose={onRequestClose} classes={{paper: classes.dialog}}>
                    <DialogContent>
                        <DialogContentText>
                            {name}
                        </DialogContentText>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel>请输入需要充值的金额</InputLabel>
                            <Input
                                value={rechargeAmount}
                                type="number"
                                onChange={this.props.handleOnChange}
                                startAdornment={<InputAdornment position="start">￥</InputAdornment>}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onRequestClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={() => memberRecharge(+rechargeAmount)} color="primary">
                            充值
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(MemberRechargeDialog);