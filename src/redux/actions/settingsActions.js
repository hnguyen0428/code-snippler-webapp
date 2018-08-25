import {SETTINGS_MOST_POPULAR, SETTINGS_MOST_SAVED, SETTINGS_MOST_VIEWS, SETTINGS_MOST_UPVOTED} from '../actions/types';
import FeedSettings from '../../constants/FeedSettings';


export const saveSettings = (settingsCode) => dispatch => {
    switch (settingsCode) {
        case FeedSettings.MOST_POPULAR:
            dispatch({type: SETTINGS_MOST_POPULAR});
            break;
        case FeedSettings.MOST_VIEWS:
            dispatch({type: SETTINGS_MOST_VIEWS});
            break;
        case FeedSettings.MOST_UPVOTED:
            dispatch({type: SETTINGS_MOST_UPVOTED});
            break;
        case FeedSettings.MOST_SAVED:
            dispatch({type: SETTINGS_MOST_SAVED});
            break;
        default:
            break;
    }
};