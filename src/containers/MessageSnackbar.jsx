import * as React from "react";
import {Snackbar} from "material-ui";
import {connect} from "react-redux";
import {oMQ} from "../redux/messages";

const MessageSnackbar = ({dispatch, open, message}) => (
    <Snackbar open={open} message={message && `[${message.type}]: ${message.message}`} autoHideDuration={6000}
              onClose={() => dispatch(oMQ())}/>
);

const selector = state => ({
    open: state.messages.length > 0,
    message: state.messages[0]
});

export default connect(selector)(MessageSnackbar);