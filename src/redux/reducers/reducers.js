import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import snippetReducer from './snippetReducer';
import commentReducer from './commentReducer';
import languageReducer from './languageReducer';


export default combineReducers({
    auth: authReducer,
    users: userReducer,
    snippets: snippetReducer,
    comments: commentReducer,
    languages: languageReducer
});