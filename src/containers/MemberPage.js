import React from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import {isMemberSignUpOpen, isMemberTopUpOpen, TopUpMemberId} from "../redux/switches";
import {Button, Collapse, Grid, IconButton, LinearProgress, Modal, Slide, Tooltip, Typography} from "material-ui";
import MemberSignUpForm from "../components/MemberSignUpForm";
import {createMember} from "../redux/mutations";
import {Add, AttachMoney, Person} from "material-ui-icons";
import MemberTable from "../components/MemberTable";
import SearchBar from "./SearchBar";

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

const MemberPage = ({classes, dispatch, isSignUp, searchMembers, searchKey, isComplete, isTyping}) => {

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
                                <Tooltip key={0} title="详细资料卡">
                                    <IconButton>
                                        <Person/>
                                    </IconButton>
                                </Tooltip>,
                                <Tooltip key={1} title="充值">
                                    <IconButton onClick={() => {
                                        dispatch(TopUpMemberId.setter(member.id));
                                        dispatch(isMemberTopUpOpen.setTrue());
                                    }}>
                                        <AttachMoney/>
                                    </IconButton>
                                </Tooltip>
                            ]}
                        />
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
        </div>
    );
};


const selector = (state) => ({
    members: state.members.member,
    isSignUp: state.switches.isMemberSignUpOpen,
    searchKey: state.search.key,
    searchMembers: Object.values(state.search.results.members),
    isComplete: state.search.isComplete,
    isTyping: state.search.isTyping,
});

export default withStyles(styles)(connect(selector)(MemberPage));