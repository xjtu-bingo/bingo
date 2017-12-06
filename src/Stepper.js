import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Stepper, {Step, StepContent, StepLabel} from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "material-ui";
import OrderDetail from './OrderDetail'
import Menu from './Menu';
import MemberSearch from './SearchTable'

const styles = theme => ({
    root: {
        width: '90%',
    },
    action: {
        margin: '2em'
    },
    buttonOne: {
        marginRight: '18%',
    },
    buttonTwo: {
        marginRight: '10%',
    },
    buttonThree: {
        marginRight: '48%',
    },
    actionsContainer: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    resetContainer: {
        marginTop: 0,
        padding: theme.spacing.unit * 3, // TODO: See TODO note on Stepper
    },
    formControl: {
        marginTop: '2em',
        paddingLeft: '1em'
    },
    memberSearch: {
        display: 'none'
    }
});

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 0,
        value: '',
        open: false,
        display: false
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleChange = (e, v) => {
        this.setState({value: v});
    };

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;

        let order = [{name: "蜂蜜柠檬茶", price: 6, amount: 1}, {name: '热可可', price: 7, amount: 2}];
        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>菜单</StepLabel>
                        <StepContent>
                            <Menu/>
                            <Button raised color="primary" onClick={this.handleNext} className={classes.action}>
                                确定
                            </Button>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>订单</StepLabel>
                        <StepContent>
                            <OrderDetail
                                data={order}/>
                            <Typography type="headline" noWrap>
                                {order.map(o => `${o.amount} 份 ${o.name}`).join('；') + '。还需要别的吗？'}
                            </Typography>
                            <br/>
                            <Button raised color="primary" onClick={this.handleNext}
                                    className={classes.action}>确定</Button>
                            <Button raised color="accent" onClick={this.handleBack}
                                    className={classes.action}>返回</Button>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>付款</StepLabel>
                        <StepContent>
                            <Typography type="headline">
                                订单共计 10 元，请选择支付方式：
                            </Typography>
                            <FormControl component="fieldset" required className={classes.formControl}>
                                <FormLabel component="legend">支付方式</FormLabel>
                                <RadioGroup
                                    name="支付方式"
                                    className={classes.group}
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    row
                                >
                                    <FormControlLabel value="card" control={<Radio/>} label="会员"
                                                      onClick={this.handleMemberSearchOpen}/>
                                    <FormControlLabel value="cash" control={<Radio/>} label="现金"
                                                      onClick={this.handleMemberSearchClose}/>
                                    <FormControlLabel value="alipay" control={<Radio/>} label="支付宝"
                                                      onClick={this.handleMemberSearchClose}/>
                                    <FormControlLabel value="wechat" control={<Radio/>} label="微信"
                                                      onClick={this.handleMemberSearchClose}/>
                                </RadioGroup>
                            </FormControl>
                            <br/>
                            <MemberSearch className={this.state.display ? null : classes.memberSearch}/>
                            <br/>
                            <Button raised color="primary" onClick={this.handleNext}
                                    className={classes.action}>确定</Button>
                            <Button raised color="accent" onClick={this.handleBack}
                                    className={classes.action}>返回</Button>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>完成</StepLabel>
                        <StepContent>
                            <Typography>订单已提交，本次点单结束，请开始制作。</Typography>
                            <Button raised color="primary" className={classes.action}>查看待制作产品</Button>
                            <Button raised color="accent" className={classes.action}>再来一单</Button>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);