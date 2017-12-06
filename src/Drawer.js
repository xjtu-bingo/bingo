import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import {ListItem, ListItemIcon, ListItemText} from "material-ui";
import CafeIcon from "material-ui-icons/LocalCafe";
import TimerIcon from 'material-ui-icons/Timer';
import MemberIcon from 'material-ui-icons/CardMembership';
import CookbookIcon from 'material-ui-icons/Book';
import AlarmIcon from 'material-ui-icons/Alarm';
import FinancialIcon from 'material-ui-icons/AttachMoney';
import StaffIcon from 'material-ui-icons/Flag';

import Stepper from './Stepper'


const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 800,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

class MiniDrawer extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography align='center' type="title" color="inherit" noWrap>
                                品阁咖啡屋
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        type="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.drawerInner}>
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                                </IconButton>
                            </div>
                            <Divider/>
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <TimerIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="待处理订单"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <CafeIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="点单"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <MemberIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="品阁会员"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <CookbookIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="制作方法"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AlarmIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="计时器"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <FinancialIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="财务报表"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListItem button>
                                    <ListItemIcon>
                                        <StaffIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="员工签到"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <Typography type="body1" noWrap>
                            <Stepper/>
                        </Typography>
                    </main>
                </div>
            </div>
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MiniDrawer);