import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Stepper, {Step, StepContent, StepLabel} from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "material-ui";
import OrderDetail from './OrderDetail'
import Menu from './Menu';
import MemberSearch from './MemberSearch'

const styles = theme => ({
    root: {
        width: '90%',
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

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

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
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>菜单</StepLabel>
                        <StepContent>
                            <Menu/>
                            <Button raised color="primary" onClick={this.handleNext} className={classes.buttonOne}>
                                确定
                            </Button>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>付款</StepLabel>
                        <StepContent>
                            <OrderDetail
                                data={[{name: "AASD", price: 2, amount: 12}, {name: 'HH', price: 3, amount: 30}]}/>
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
                            <Button raised color="primary" onClick={this.handleBack} className={classes.buttonTwo}>
                                上一步
                            </Button>
                            <Button raised color="primary" onClick={this.handleNext} className={classes.buttonThree}>
                                确定
                            </Button>
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