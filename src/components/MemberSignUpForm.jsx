import * as React from "react";
import {Button, TextField} from "material-ui";

class MemberSignUpForm extends React.Component {
    state = {};

    render() {
        return (
            <form>
                <TextField
                    id="name"
                    label="姓名"
                    margin="normal"
                />
                <TextField
                    id="abbr"
                    label="缩写"
                    margin="normal"
                />
                <TextField
                    id="gender"
                    label="性别"
                    margin="normal"
                />
                <TextField
                    id="birthday"
                    label="生日"
                    margin="normal"
                />
                <TextField
                    id="tel"
                    label="电话"
                    margin="normal"
                />
                <TextField
                    id="number"
                    label="卡号"
                    margin="normal"
                />
                <TextField
                    id="balance"
                    label="余额"
                    margin="normal"
                />
                <br/>
                <Button color="primary" variant="raised" onClick={() => {
                    console.log(this.refs)
                }}>
                    提交
                </Button>
            </form>
        );
    }
}

export default MemberSignUpForm;