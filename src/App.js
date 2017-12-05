import React, {Component} from 'react';
import './App.css';
import Add from './Add'
import Edit from './Edit'
import Drawer from './Drawer'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Drawer/>

                <Add/>
                <Edit/>
            </div>
        );
    }
}

export default App;
