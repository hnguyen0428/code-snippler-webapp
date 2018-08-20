import {LOCATION_CHANGE} from 'react-router-redux';

const initialState = {
    prevPath: '/',
    path: '/'
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            let prevPath = state.path;

            return {
                ...state,
                path: action.payload.pathname,
                prevPath: prevPath
            };
        default:
            return state
    }
}