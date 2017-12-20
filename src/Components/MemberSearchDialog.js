import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent, DialogTitle,} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles'
import PersonalInformationTable from './PersonalInformationTable'

const style = () => ({
    dialog: {
        width: "100%",
    }
});
class MemberSearchDialog extends React.Component {

    render() {
        let {classes} = this.props;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleMemberSearchDialogOnClose}
                    aria-labelledby="form-dialog-title"
                    classes={{paper: classes.dialog}}
                >
                    <DialogTitle id="form-dialog-title">会员搜索</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="姓名/电话/卡号等"
                            fullWidth
                        />
                    </DialogContent>
                    <PersonalInformationTable onClick={this.props.handlePersonalInformationSelected}
                                              tableSelected={this.props.tableSelected}/>
                    <DialogActions>
                        <Button onClick={this.props.handleMemberSearchDialogClose} color="primary">
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(style)(MemberSearchDialog);