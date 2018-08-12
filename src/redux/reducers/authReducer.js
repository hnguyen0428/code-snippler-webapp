import {LOGIN, REGISTER} from '../actions/types';


const initialState = {
    currentUser: null
};


export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            // Save apiKey and the user data to persist user
            localStorage.setItem('apiKey', action.payload.apiKey);
            localStorage.setItem(action.payload.apiKey, action.payload);

            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}