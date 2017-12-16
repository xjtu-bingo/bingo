import React, {Component} from 'react';
import Drawer from './Components/Drawer';
import Add from './Components/Add';
import Edit from './Components/Edit';
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';
import brown from "material-ui/colors/brown";

const theme = createMuiTheme({
    palette: {
        primary: {
            ...red,
            [500]: 'rgb(163, 46, 10)'
        },
        secondary: brown,
        error: purple
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="full-height">
                    <Drawer/>
                    <Add/>
                    <Edit/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
