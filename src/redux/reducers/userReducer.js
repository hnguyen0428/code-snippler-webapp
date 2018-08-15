import {FETCH_ME, FETCH_USER, FETCH_USERS} from '../actions/types';


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
        case FETCH_USERS: {
            let users = action.payload.data;
            users.forEach(user => {
                state.byIds[user.userId] = user;
            });
            return state;
        }
        default:
            return state;
    }
}