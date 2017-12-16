import React, {Component} from 'react';
import Add from './Components/Add'
import Edit from './Components/Edit'
import Drawer from './Drawer'

class App extends Component {
    render() {
        return (
            <div className="full-height">
                <Drawer/>

                <Add/>
                <Edit/>
            </div>
        );
    }
}

export default App;
