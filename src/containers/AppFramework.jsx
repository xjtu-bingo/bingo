import React from 'react';
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
import CafeIcon from "material-ui-icons/LocalCafe";
import TimerIcon from 'material-ui-icons/Timer';
import MemberIcon from 'material-ui-icons/CardMembership';
import CookbookIcon from 'material-ui-icons/Book';
import AlarmIcon from 'material-ui-icons/Alarm';
import FinancialIcon from 'material-ui-icons/AttachMoney';
import StaffIcon from 'material-ui-icons/Flag';
import MemberPage from './MemberPage';
import Badge from 'material-ui/Badge'
import ManufacturingMethodPage from '../ManufacturingMethodPage'
import OrderProcessingPage from './OrderProcessingPage'
import {connect} from "react-redux";
import OrderPage from './OrderPage'
import NavigateItem from "../components/NavigateItem";
import {appNavigation, isNavigationExpanded} from "../redux/switches";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
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
        zIndex: theme.zIndex.drawer + 1,
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
        // height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 72,
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
        backgroundColor: theme.palette.background.default,
        padding: 24,
        marginTop: 56,
        overflowY: 'auto'
    },
});

const AppFramework = ({classes, badgeCount, dispatch, open, content, title}) => {

    const badge = badgeCount > 0 ? (
        <Badge className={classes.badge}
               badgeContent={badgeCount}
               color="primary">
            <TimerIcon/>
        </Badge>
    ) : <TimerIcon/>;

    return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => dispatch(isNavigationExpanded.setTrue())}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.drawerInner}>
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={() => dispatch(isNavigationExpanded.setFalse())}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <NavigateItem text="待处理订单" icon={badge} onClick={() => dispatch(appNavigation.setter(1))}/>
                            <NavigateItem text="点单" icon={<CafeIcon/>}
                                          onClick={() => dispatch(appNavigation.setter(2))}/>
                            <NavigateItem text="品阁会员" icon={<MemberIcon/>}
                                          onClick={() => dispatch(appNavigation.setter(3))}/>
                        </List>
                        <Divider/>
                        <List>
                            <NavigateItem text="制作方法" disabled icon={<CookbookIcon/>}
                                          onClick={() => dispatch(appNavigation.setter(4))}/>
                            <NavigateItem text="计时器" disabled icon={<AlarmIcon/>}/>
                        </List>
                        <Divider/>
                        <List>
                            <NavigateItem text="财务报表" disabled icon={<FinancialIcon/>}/>
                        </List>
                        <Divider/>
                        <List>
                            <NavigateItem text="员工签到" disabled icon={<StaffIcon/>}/>
                        </List>
                    </div>
                </Drawer>
                <div className={classes.content}>
                    {content}
                </div>
            </div>
        </div>
    );
};

const titles = ["加载中", "待处理订单", "点单", "会员", "制作方法"];
const sub = [null, <OrderProcessingPage/>, <OrderPage/>, <MemberPage/>, <ManufacturingMethodPage/>];

const selector = (state) => {
    const page = state.switches.appNavigation || 0;
    return {
        badgeCount: Object.values(state.repo.orders).filter(order => order.status === 'NEW' || order.status === 'PAID').length,
        page,
        open: state.switches.isNavigationExpanded,
        title: `品阁咖啡屋 > ${titles[page]}`,
        content: sub[page]
    }
};

export default withStyles(styles, {withTheme: true})(connect(selector)(AppFramework));