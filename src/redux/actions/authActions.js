import Snippler from '../../api/SnipplerClient';
import {LOGIN, REGISTER} from './types';
import {handleActionsResult} from './actions';


export const login = (username, password, callback, noResCB) => dispatch => {
    Snippler.auth().login({
        username: username,
        password: password,
    }, (res, error) => {
        let success = handleActionsResult(res, error, callback, noResCB);
        if (success)
            dispatch({
                type: LOGIN,
                payload: res.data
            });
    });
};


export const register = (username, password, callback, noResCB) => dispatch => {
    Snippler.auth().register({
        username: username,
        password: password,
    }, (res, error) => {
        let success = handleActionsResult(res, error, callback, noResCB);
        if (success)
            dispatch({
                type: REGISTER,
                payload: res.data
            });
    });
};
