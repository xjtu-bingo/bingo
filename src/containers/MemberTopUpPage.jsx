import * as React from "react";
import {Button, Modal, TextField, Typography, withStyles} from "material-ui";
import {connect} from "react-redux";
import {isMemberTopUpOpen, TopUpAmount} from "../redux/switches";
import {updateMemberBalanceTopup} from "../redux/mutations";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },

});

const MemberTopUpPage = ({classes, dispatch, member, open, amount}) => open ? (
    <Modal
        open={open}
        onClose={() => dispatch(isMemberTopUpOpen.setFalse())}
    >
        <div style={{
            top: `${50}%`,
            left: `${50}%`,
            transform: `translate(-${50}%, -${50}%)`,
        }} className={classes.paper}>
            <Typography variant="display1">会员充值</Typography>
            <Typography>卡号：{member.number}</Typography>
            <Typography>姓名：{member.name}</Typography>
            <Typography>余额：{member.balance}</Typography>
            <TextField label="充值金额" type="number" value={amount}
                       onChange={e => dispatch(TopUpAmount.setter(e.target.value))}/>
            <Button onClick={() => dispatch(updateMemberBalanceTopup({id: member.id, amount}))}>充值</Button>
        </div>
    </Modal>
) : null;

const selector = state => ({
    member: state.repo.members[state.switches.topUpMemberId],
    open: state.switches.isMemberTopUpOpen,
    amount: state.switches.topUpAmount
});

export default withStyles(styles)(connect(selector)(MemberTopUpPage));