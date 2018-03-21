import React, {Component} from 'react';
import Drawer from './Drawer';
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';
import brown from "material-ui/colors/brown";
import {Provider} from "react-redux";
import store from './redux';
import query from "./query";
import {loadProducts} from "./redux/repo/products";
import {loadOrders} from "./redux/repo/orders";

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

query(`query { products(limit: 60) {id name price type} orders { id date status details { name price amount} member { id } total }}`)
    .then(v => v.json())
    .then(v => {
        store.dispatch(loadProducts(v.data.products));
        store.dispatch(loadOrders(v.data.orders));
    });

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
