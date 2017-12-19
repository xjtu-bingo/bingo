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
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import {ListItem, ListItemIcon, ListItemText} from "material-ui";
import CafeIcon from "material-ui-icons/LocalCafe";
import TimerIcon from 'material-ui-icons/Timer';
import MemberIcon from 'material-ui-icons/CardMembership';
import CookbookIcon from 'material-ui-icons/Book';
import AlarmIcon from 'material-ui-icons/Alarm';
import FinancialIcon from 'material-ui-icons/AttachMoney';
import StaffIcon from 'material-ui-icons/Flag';
import MemberPage from './MemberPage';
import Badge from 'material-ui/Badge'
import ManufacturingMethodPage from './ManufacturingMethodPage'
import OrderProcessingPage from './OrderProcessingPage'
import {connect} from "react-redux";
import Stepper from './OrderPage'


const data = [[{name: "星冰乐", price: 10, amount: 2}, {name: "keke", price: 20, amount: 3}], [{
    name: "星冰乐",
    price: 10,
    amount: 2
}, {name: "keke", price: 20, amount: 3}], [{name: "星冰乐", price: 10, amount: 2}, {name: "keke", price: 20, amount: 3}]];
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
        backgroundColor: theme.palette.background.default,
        padding: 24,
        marginTop: 56,
        overflowY: 'auto'
    },
});

class MiniDrawer extends React.Component {
    state = {
        open: false,
        page: 1,
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleOrderProcessingPageChange = () => {
        this.setState({
            page: 0,
        })
    };
    handleOrderPageChange =() => {
        this.setState({
            page: 1,
        })
    };

    handleMemberPageChange =() => {
        this.setState({
            page: 2,
        })
    };

    handleManufacturingMethodPageChange = () => {
        this.setState({
            page: 3,
        })
    };
    render() {
        const {classes, theme, order, paidOrder} = this.props;
        console.log(paidOrder);
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
                                <ListItem button onClick={this.handleOrderProcessingPageChange}>
                                    <ListItemIcon>
                                        <Badge className={classes.badge} badgeContent={order.length + paidOrder.length}
                                               color="primary">
                                            <TimerIcon/>
                                        </Badge>
                                    </ListItemIcon>
                                    <ListItemText primary="待处理订单"/>
                                </ListItem>
                                <ListItem button onClick={this.handleOrderPageChange}>
                                    <ListItemIcon>
                                        <CafeIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="点单"/>
                                </ListItem>
                                <ListItem button onClick={this.handleMemberPageChange}>
                                    <ListItemIcon>
                                        <MemberIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="品阁会员"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListItem button onClick={this.handleManufacturingMethodPageChange}>
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
                    <div className={classes.content}>
                        {this.state.page === 0 ?
                            <OrderProcessingPage untreatedOrder={data} paidOrder={data} finishedOrder={data}/> : null}
                        {this.state.page === 1 ? <Stepper/> : null}
                        {this.state.page === 2 ? <MemberPage/> : null}
                        {this.state.page === 3 ? <ManufacturingMethodPage/> : null}
                    </div>
                </div>
            </div>
        );
    }
}

const selector = (state) => ({
    order: state.orders.items,
    paidOrder: state.orders.paidItems,
});

export default withStyles(styles, {withTheme: true})(connect(selector)(MiniDrawer));