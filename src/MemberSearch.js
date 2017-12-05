import React, {Component} from 'react';
import {FormControl, Input} from "material-ui";


class MemberSearch extends Component {
    state = {
        key: ''
    };
    handleChangeInput = event => {
        this.setState({key: event.target.value});
    };

    render() {
        return (
            <FormControl fullWidth>
                <Input
                    id="amount"
                    value={this.state.key}
                    onChange={this.handleChangeInput}
                    placeholder="会员卡号/姓名/手机号"
                />
            </FormControl>
        );
    }
}

export default MemberSearch;
