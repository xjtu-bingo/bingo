import React, { Fragment, Component } from 'react';
import moment from 'moment';
import { Typography } from 'material-ui';
import { TimePicker, DatePicker } from 'material-ui-pickers';
import LeftArrowIcon from 'material-ui-icons/KeyboardArrowLeft';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';

export default class BasicUsage extends Component {
    state = {
        selectedDate: moment(),
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        const { selectedDate } = this.state;

        return (
            <Fragment>
                <div className="picker">
                    <DatePicker
                        value={selectedDate}
                        onChange={this.handleDateChange}
                        animateYearScrolling={false}
                        leftArrowIcon={<LeftArrowIcon/>}
                        rightArrowIcon={<RightArrowIcon/>}
                    />
                </div>
            </Fragment>
        );
    }
}