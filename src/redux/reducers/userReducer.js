import {FETCH_ME, FETCH_USER} from '../actions/types';


const initialState = {
    byIds: {}
};


export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
        case FETCH_ME: {
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [action.payload.userId]: action.payload
                }
            };
        }
        default:
            return state;
    }
}