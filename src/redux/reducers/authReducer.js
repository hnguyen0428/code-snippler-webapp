import {LOGIN, REGISTER} from '../actions/types';


const initialState = {
    items: [],
    item: {},
};


export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                currentUser: action.payload.data
            };
        default:
            return state;
    }
}