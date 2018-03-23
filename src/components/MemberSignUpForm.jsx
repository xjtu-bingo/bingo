import * as React from "react";
import {Button, InputAdornment, MenuItem, TextField, withStyles} from "material-ui";
import pinyin from 'js-pinyin';

const styles = theme => ({});


class MemberSignUpForm extends React.Component {
    state = {
        name: '',
        abbr: '',
        gender: 'UNKNOWN',
        birthday: '',
        tel: '',
        number: '',
        balance: 0
    };

    set = key => value => this.setState({[key]: value});
    handle = key => event => this.set(key)(event.target.value);
    handleName = e => {
        let name = e.target.value;
        let abbr = pinyin.getCamelChars(name);
        this.setState({
            name,
            abbr
        });
    };

    handleSubmit = () => {
        const {onSubmit} = this.props;
        onSubmit && onSubmit(Object.assign({}, this.state));
    };

    render() {

        const {classes} = this.props;
        const {name, abbr, gender, birthday, tel, number, balance} = this.state;

        return (
            <form autoComplete="off">
                <TextField
                    required
                    value={number}
                    onChange={this.handle('number')}
                    type="number"
                    label="卡号"
                    margin="normal"
                />
                <TextField
                    label="余额"
                    required
                    value={balance}
                    onChange={this.handle('balance')}
                    type="number"
                    margin="normal"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">￥</InputAdornment>
                    }}
                />
                <br/>
                <TextField
                    value={name}
                    onChange={this.handleName}
                    label="姓名"
                    margin="normal"
                />
                <TextField
                    value={abbr}
                    onChange={this.handle('abbr')}
                    label="缩写"
                    margin="normal"
                />
                <TextField
                    select
                    label="性别"
                    value={gender}
                    onChange={this.handle('gender')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                >
                    <MenuItem value="UNKNOWN">未知/保密</MenuItem>
                    <MenuItem value="FEMALE">女</MenuItem>
                    <MenuItem value="MALE">男</MenuItem>
                </TextField>
                <br/>
                <TextField
                    label="生日"
                    type="date"
                    value={birthday}
                    onChange={this.handle('birthday')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    label="电话"
                    value={tel}
                    onChange={this.handle('tel')}
                    type="number"
                    margin="normal"
                />
                <br/>
                <Button color="primary" variant="raised" onClick={this.handleSubmit}>
                    提交
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(MemberSignUpForm);