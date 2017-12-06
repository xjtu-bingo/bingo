import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Stepper, {Step, StepContent, StepLabel} from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "material-ui";
import OrderDetail from './OrderDetail'
import Menu from './Menu';
import MemberSearch from './MemberSearch'

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
    }
});

class VerticalLinearStepper extends React.Component {
    state = {
        activeStep: 0,
        value: '',

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
                                data={[{name: "AASD", price: 2, amount: 12}, {name: 'HH', price: 3, amount: 30}]}/>
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
                                    <FormControlLabel value="card" control={<Radio/>} label="会员"/>
                                    <FormControlLabel value="cash" control={<Radio/>} label="现金"/>
                                    <FormControlLabel value="alipay" control={<Radio/>} label="支付宝"/>
                                    <FormControlLabel value="wechat" control={<Radio/>} label="微信"/>
                                </RadioGroup>
                            </FormControl>
                            <br/>
                            <MemberSearch/>
                            <br/>
                            <Button raised color="primary" onClick={this.handleNext}
                                    className={classes.action}>确定</Button>
                            <Button raised color="accent" onClick={this.handleBack}
                                    className={classes.action}>返回</Button>
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