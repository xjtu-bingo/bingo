import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import RegisterPage from './RegisterPage'
import TopUpPage from './TopUpPage';
import {connect} from 'react-redux';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        marginLeft: 200,
        marginTop: 100,
        height: 200,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

const images = [
    {
        url: '/static/images/grid-list/burgers.jpg',
        title: '新会员注册',
        width: 450,
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: '会员充值',
        width: 450,
    },
];


class MemberPage extends Component {

    state = {
        id: 0,
        display: false,
        registerPageOpen: false,
        topUpPageOpen: false,
    };

    // handleMemberSearchOpen = () => {
    //     this.setState({open: true})
    // };
    // handleMemberSearchClose = () => {
    //     this.setState({open: false})
    // };


    handleRegisterPageOpen = () => {
        this.setState({registerPageOpen: true});
    };

    handleRegisterPageOnRequestClose = () => {
        this.setState({
            registerPageOpen: false,
        });
    };

    handleRegisterPageRequestClose = (name, phoneNumber, cardNumber, amount, gender, birthday) => {
        let {dispatch} = this.props;
        this.setState({registerPageOpen: false, id: this.state.id + 1});
        dispatch({
            type: "NEW/MEMBER",
            payload: {
                id: this.state.id,
                name: name,
                phoneNumber: phoneNumber,
                cardNumber: cardNumber,
                amount: amount,
                gender: gender,
                birthday: birthday
            },
        });
        console.log(name + birthday + gender);
    };

    handleTopUpPageOpen = () => {
        this.setState({topUpPageOpen: true});
    };

    handleMemberRecharge = (amount, id) => {
        console.log(amount);
        let {dispatch} = this.props;
        dispatch({
            type: "MEMBER/RECHARGE",
            payload: {id: id, amount: amount},
        })
    };

    handleTopUpPageRequestClose = () => {
        this.setState({topUpPageOpen: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <ButtonBase
                    focusRipple
                    key={images[0].title}
                    className={classes.image}
                    style={{
                        width: images[0].width,
                    }}
                    onClick={this.handleRegisterPageOpen}
                >
                    <div
                        className={classes.imageSrc}
                        style={{
                            backgroundColor: '#BF360C',
                        }}
                    />
                    <div className={classes.imageBackdrop}/>
                    <div className={classes.imageButton}>
                        <Typography
                            component="h3"
                            type="subheading"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            {images[0].title}
                            <div className={classes.imageMarked}/>
                        </Typography>
                    </div>
                </ButtonBase>
                <ButtonBase
                    focusRipple
                    key={images[1].title}
                    className={classes.image}
                    style={{
                        width: images[1].width,
                    }}
                    onClick={this.handleTopUpPageOpen}
                >
                    <div
                        className={classes.imageSrc}
                        style={{
                            backgroundColor: '#BF360C',
                        }}
                    />
                    <div className={classes.imageBackdrop}/>
                    <div className={classes.imageButton}>
                        <Typography
                            component="h3"
                            type="subheading"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            {images[1].title}
                            <div className={classes.imageMarked}/>
                        </Typography>
                    </div>
                </ButtonBase>
                {/*<MemberSearchDialog open={this.state.open} onRequestClose={this.handleMemberSearchClose}/>*/}
                <RegisterPage open={this.state.registerPageOpen} onRequestClose={this.handleRegisterPageOnRequestClose}
                              RegisterRequestClose={this.handleRegisterPageRequestClose}/>
                <TopUpPage open={this.state.topUpPageOpen} onRequestClose={this.handleTopUpPageRequestClose}
                           members={this.props.members}
                           handleMemberRecharge={this.handleMemberRecharge}/>
            </div>
        );
    }
}

const selector = (state) => ({
    members: state.members.member,
});

export default withStyles(styles)(connect(selector)(MemberPage));