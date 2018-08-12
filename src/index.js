import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import {LOGIN} from './redux/actions/types';
import Snippler from './api/SnipplerClient';
import {handleActionsResult} from './redux/actions/actions';


// Persisting user
const apiKey = localStorage.getItem('apiKey');
if (apiKey) {
    const userData = localStorage.getItem(apiKey);
    if (userData) {
        let user = JSON.parse(userData);
        store.dispatch({type: LOGIN, payload: user});
    }
    else {
        Snippler.user().getMyProfile(null, (res, error) => {
            let success = handleActionsResult(res, error, null, null);
            if (success)
                store.dispatch({type: LOGIN, payload: res.data});
        });
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
