import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField,} from "material-ui";

import {withStyles} from 'material-ui/styles'

const styles = theme => ({
    formControl: {
        marginTop: '2em',
        paddingLeft: '1em'
    },
    dialog: {
        width: 1000,
    }
});

const MemberSearchDialog = ({classes, open, onRequestClose}) => (
    <div>
        <Dialog open={open} onRequestClose={onRequestClose}>
            <DialogContent>
                <DialogContentText>
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
                <Button onClick={onRequestClose} color="primary">
                    取消
                </Button>
                <Button onClick={onRequestClose} color="primary">
                    搜索
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);

export default withStyles(styles)(MemberSearchDialog);