import {CREATE_SNIPPET, FETCH_SNIPPET, UPDATE_SNIPPET, DELETE_SNIPPET, UPVOTE_SNIPPET, DOWNVOTE_SNIPPET,
    SAVE_SNIPPET, FETCH_POPULAR, FETCH_MOST_VIEWS, FETCH_MOST_SAVED, FETCH_MOST_UPVOTES,
    FETCH_MY_SAVED_SNIPPETS, FETCH_MY_CREATED_SNIPPETS, FETCH_USER_SAVED_SNIPPETS,
    FETCH_USER_CREATED_SNIPPETS, FETCH_SNIPPETS} from '../actions/types';


const initialState = {
    byIds: {}
};


export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_SNIPPET:
        case FETCH_SNIPPET:
        case UPDATE_SNIPPET: {
            let snippet = action.payload;
            // If this snippet was in the state before, then merge the two objects with
            // the payload as the priority
            if (state.byIds[snippet.snippetId])
                snippet = {...state.byIds[snippet.snippetId], ...snippet};

            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [snippet.snippetId]: snippet
                }
            };
        }
        case DELETE_SNIPPET: {
            let snippetId = action.payload;
            // Delete from state the snippet that was deleted
            let byIds = state.byIds;
            if (byIds[snippetId])
                delete byIds[snippetId];

            return {
                ...state,
                byIds: byIds
            };
        }
        case UPVOTE_SNIPPET: {
            // Data contains {snippetId: <id>, upvoted: <true/false>}
            let data = action.payload;
            let byIds = state.byIds;
            if (byIds[data.snippetId]) {
                byIds[data.snippetId].upvoted = data.upvoted
            }
            return {
                ...state,
                byIds: byIds
            };
        }
        case DOWNVOTE_SNIPPET: {
            // Data contains {snippetId: <id>, downvoted: <true/false>}
            let data = action.payload;
            let byIds = state.byIds;
            if (byIds[data.snippetId]) {
                byIds[data.snippetId].downvoted = data.downvoted
            }
            return {
                ...state,
                byIds: byIds
            };
        }
        case SAVE_SNIPPET: {
            // Data contains {snippetId: <id>, saved: <true/false>}
            let data = action.payload;
            let byIds = state.byIds;
            if (byIds[data.snippetId]) {
                byIds[data.snippetId].saved = data.saved
            }
            return {
                ...state,
                byIds: byIds
            };
        }
        case FETCH_POPULAR:
        case FETCH_MOST_UPVOTES:
        case FETCH_MOST_VIEWS:
        case FETCH_MOST_SAVED:
        case FETCH_USER_SAVED_SNIPPETS:
        case FETCH_USER_CREATED_SNIPPETS:
        case FETCH_MY_SAVED_SNIPPETS:
        case FETCH_MY_CREATED_SNIPPETS:
        case FETCH_SNIPPETS: {
            let byIds = state.byIds;
            let snippets = action.payload;
            snippets.forEach(snippet => {
                if (byIds[snippet.snippetId])
                    byIds[snippet.snippetId] = {...byIds[snippet.snippetId], ...snippet};
                else
                    byIds[snippet.snippetId] = snippet;
            });
            return {
                ...state,
                byIds: byIds
            };
        }
        default:
            return state;
    }
}