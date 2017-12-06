import React, {Component} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "material-ui";

import {withStyles} from 'material-ui/styles'

const styles = theme => ({
    formControl: {
        marginTop: '2em',
        paddingLeft: '1em'
    },
    dialogContext: {
        width: 700,
    }
});

class MemberSearchDialog extends Component {
    state = {
        open: false,
        value: ''
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleChange = (e, v) => {
        this.setState({value: v});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">支付方式</FormLabel>
                    <RadioGroup
                        name="支付方式"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                        row
                    >
                        <FormControlLabel value="card" control={<Radio/>} label="会员" onClick={this.handleClickOpen}/>
                        <FormControlLabel value="cash" control={<Radio/>} label="现金"/>
                        <FormControlLabel value="alipay" control={<Radio/>} label="支付宝"/>
                        <FormControlLabel value="wechat" control={<Radio/>} label="微信"/>
                    </RadioGroup>
                </FormControl>
                <br/>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogContent>
                        <DialogContentText className={classes.dialogContext}>
                            请输入会员信息，如：会员卡号，会员姓名，手机号码等等。
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="会员搜索"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            搜索
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(MemberSearchDialog);