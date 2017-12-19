import React, {Component} from 'react';
import Drawer from './Drawer';
import Add from './Components/Add';
import Edit from './Components/Edit';
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';
import brown from "material-ui/colors/brown";
import {Provider} from "react-redux";
import store from './redux';

const theme = createMuiTheme({
    palette: {
        primary: {
            ...red,
            500: 'rgb(163, 46, 10)'
        },
        secondary: brown,
        error: purple
    }
});

store.dispatch({
    type: 'PRODUCT/LOAD',
    payload: [
        {
            category: '奶茶',
            id: 'A',
            name: '原味奶茶',
            price: 6
        },
        {
            category: '奶茶',
            id: 'B',
            name: '啤酒',
            price: 4
        },
        {
            category: '奶绿',
            id: 'C',
            name: '原味奶绿',
            price: 7
        },
        {
            category: '奶绿',
            id: 'D',
            name: '绿啤酒',
            price: 5
        },
        {
            category: '奶绿',
            id: 'E',
            name: '草原',
            price: 1
        }
    ]
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <div className="full-height">
                        <Drawer/>
                        <Add/>
                        <Edit/>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}
export default App;
