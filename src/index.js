import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';

import moment from 'moment';
import 'moment/locale/zh-cn';
import store, {init} from './redux';

moment.locale('zh-cn');

store.dispatch(init());

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
