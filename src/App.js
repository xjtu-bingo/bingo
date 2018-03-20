import React, {Component} from 'react';
import Drawer from './Drawer';
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';
import brown from "material-ui/colors/brown";
import {Provider} from "react-redux";
import store from './redux';
import query from "./query";

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

query(`query { products(limit: 60) {id name price type}}`)
    .then(v => v.json())
    .then(v => v.data.products)
    .then(v => v.map(x => ({...x, category: x.type}))) // type adapter (database)
    .then(data => store.dispatch({
        type: 'PRODUCT/LOAD',
        payload: data
    }));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <div className="full-height">
                        <Drawer/>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
