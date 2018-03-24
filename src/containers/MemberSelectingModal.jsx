import * as React from "react";
import {Collapse, Grid, IconButton, LinearProgress, Modal, Tooltip, withStyles} from "material-ui";
import {connect} from "react-redux";
import {IsSelectingMember, SelectedMemberId} from "../redux/switches";
import {updateOrderMember} from "../redux/mutations";
import SearchBar from "./SearchBar";
import MemberTable from "../components/MemberTable";
import {Done} from "material-ui-icons";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

});

const MemberSelectingModal = ({classes, dispatch, open, order, isTyping, isComplete, searchKey, searchMembers}) => open ? (
    <Modal
        open={open}
        onClose={() => dispatch(IsSelectingMember.setFalse())}
    >
        <div className={classes.paper}>
            <Grid container>
                <Grid item xs/>
                <Grid item xs={6}>
                    <SearchBar/>
                </Grid>
                <Grid item xs/>
            </Grid>
            {isTyping || !isComplete ? <LinearProgress className={classes.loading}/> : null}
            <Grid container>
                <Grid item xs={12}>
                    <Collapse in={isComplete && searchKey !== ''}>
                        <MemberTable
                            data={searchMembers}
                            getActions={member => [
                                <Tooltip key={0} title="选择">
                                    <IconButton onClick={() => {
                                        dispatch(SelectedMemberId.setter(member.id));
                                        dispatch(updateOrderMember({orderId: order.id, memberId: member.id}));
                                        dispatch(IsSelectingMember.setFalse());
                                    }}>
                                        <Done/>
                                    </IconButton>
                                </Tooltip>
                            ]}
                        />
                    </Collapse>
                </Grid>
            </Grid>
        </div>
    </Modal>
) : null;

const selector = state => ({
    open: state.switches.isSelectingMember,
    order: state.repo.orders[state.switches.selectedOrderId],
    searchKey: state.search.key,
    searchMembers: Object.values(state.search.results.members).slice(0, 5),
    isComplete: state.search.isComplete,
    isTyping: state.search.isTyping,
});

export default withStyles(styles)(connect(selector)(MemberSelectingModal));