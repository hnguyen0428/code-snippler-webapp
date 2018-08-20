import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import snippetReducer from './snippetReducer';
import commentReducer from './commentReducer';
import languageReducer from './languageReducer';
import alertReducer from './alertReducer';


export default combineReducers({
    auth: authReducer,
    users: userReducer,
    snippets: snippetReducer,
    comments: commentReducer,
    languages: languageReducer,
    routing: routerReducer,
    alert: alertReducer
});