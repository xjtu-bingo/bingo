import React, {Component} from 'react';
import Add from './Add'
import Edit from './Edit'
import Drawer from './Components/Drawer'
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
        console.log(red);
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
