import React from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import {isMemberSignUpOpen, isMemberTopUpOpen, TopUpMemberId} from "../redux/switches";
import {Button, Collapse, Grid, LinearProgress, Modal, Slide, TextField, Tooltip, Typography} from "material-ui";
import MemberSignUpForm from "../components/MemberSignUpForm";
import {createMember} from "../redux/mutations";
import {Add, Search} from "material-ui-icons";
import {updateKey} from "../redux/search";
import MemberTable from "../components/MemberTable";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    logo: {
        width: '100%',
        marginBottom: '4em'
    },
    loading: {
        margin: '2em',
        width: '100%'
    },
    addIcon: {
        position: 'fixed',
        bottom: 48,
        right: 48,
    }
});

const MemberPage = ({classes, dispatch, isSignUp, isTopUp, searchMembers, searchKey, isComplete, isTyping}) => {

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs/>
                <Grid item xs={4}>
                    <Slide in={searchKey === ''} direction="down" mountOnEnter unmountOnExit>
                        <img src="images/bingo-logo.jpg" alt="bingo-logo" className={classes.logo}/>
                    </Slide>
                </Grid>
                <Grid item xs/>
            </Grid>


            <Grid container>
                <Grid item xs/>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label={"搜索"}
                        InputProps={{
                            startAdornment: <Search/>,
                        }}
                        helperText="卡号/姓名/缩写/电话"
                        value={searchKey}
                        onChange={e => dispatch(updateKey(e.target.value))}
                    />
                </Grid>
                <Grid item xs/>
            </Grid>
            {isTyping || !isComplete ? <LinearProgress className={classes.loading}/> : null}
            <Grid container>
                <Grid item xs={12}>
                    <Collapse in={isComplete && searchKey !== ''}>
                        <MemberTable data={searchMembers} onTopUp={id => {
                            dispatch(TopUpMemberId.setter(id));
                            dispatch(isMemberTopUpOpen.setTrue());
                        }}/>
                    </Collapse>
                </Grid>
            </Grid>
            <Tooltip title="会员注册">
                <Button variant="fab" className={classes.addIcon} color="primary"
                        onClick={() => dispatch(isMemberSignUpOpen.setTrue())}>
                    <Add/>
                </Button>
            </Tooltip>
            <Modal
                open={isSignUp}
                onClose={() => dispatch(isMemberSignUpOpen.setFalse())}
            >
                <div style={{
                    top: `${50}%`,
                    left: `${50}%`,
                    transform: `translate(-${50}%, -${50}%)`,
                }} className={classes.paper}>
                    <Typography variant="display1">会员注册</Typography>
                    <MemberSignUpForm onSubmit={member => dispatch(createMember(member))}/>
                </div>
            </Modal>
            {/*<MemberSearchDialog open={this.state.open} onRequestClose={this.handleMemberSearchClose}/>*/}
            {/*<RegisterPage open={this.state.registerPageOpen} onRequestClose={this.handleRegisterPageOnRequestClose}*/}
            {/*RegisterRequestClose={this.handleRegisterPageRequestClose}/>*/}
            {/*<TopUpPage open={this.state.topUpPageOpen} onRequestClose={this.handleTopUpPageRequestClose}*/}
            {/*members={this.props.members}*/}
            {/*handleMemberRecharge={this.handleMemberRecharge}/>*/}
        </div>
    );
};


const selector = (state) => ({
    members: state.members.member,
    isSignUp: state.switches.isMemberSignUpOpen,
    isTopUp: state.switches.isMemberTopUpOpen,
    searchKey: state.search.key,
    searchMembers: Object.values(state.search.results.members),
    isComplete: state.search.isComplete,
    isTyping: state.search.isTyping,
});

export default withStyles(styles)(connect(selector)(MemberPage));