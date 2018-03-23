import React, {Component} from 'react';
import AppFramework from './containers/AppFramework';
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';
import brown from "material-ui/colors/brown";
import {Provider} from "react-redux";
import store from './redux';
import MemberTopUpPage from "./containers/MemberTopUpPage";
import * as config from "./config";

const theme = createMuiTheme({
    palette: {
        primary: {
            ...red,
            500: config.theme.primary
        },
        secondary: brown,
        error: purple
    }
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <div className="full-height">
                        <AppFramework/>
                        <MemberTopUpPage/>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
