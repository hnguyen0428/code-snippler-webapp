import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Settings from '@material-ui/icons/Settings';

import {
    fetchPopularSnippets,
    fetchMostSavedSnippets,
    fetchMostViewsSnippets,
    fetchMostUpvotesSnippets,
    searchSnippets
} from "../../../redux/actions/snippetActions";

import {saveSettings} from '../../../redux/actions/settingsActions';

import SnippetsList from '../../dumb/SnippetsList/SnippetsList';
import FeedSettings from '../../../constants/FeedSettings';

import {styles} from './styles';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snippetIds: []
        };
    }

    componentWillMount() {
        this.queryFeed();
    }


    queryFeed = (settingsCode) => {
        const setSnippetIds = (res, err) => {
            if (res) {
                let snippets = res.data;
                let snippetIds = [];
                snippets.forEach(snippet => {
                    snippetIds.push(snippet.snippetId);
                });
                this.setState({
                    snippetIds: snippetIds
                });
            }
        };

        settingsCode = settingsCode !== undefined ? settingsCode : this.props.settings.feedSettings;

        switch (settingsCode) {
            case FeedSettings.MOST_POPULAR:
                this.props.fetchPopularSnippets(null, setSnippetIds);
                return;
            case FeedSettings.MOST_VIEWS:
                this.props.fetchMostViewsSnippets(null, setSnippetIds);
                return;
            case FeedSettings.MOST_UPVOTED:
                this.props.fetchMostUpvotesSnippets(null, setSnippetIds);
                return;
            case FeedSettings.MOST_SAVED:
                this.props.fetchMostSavedSnippets(null, setSnippetIds);
                return;
            default:
                break;
        }
    };


    handleToggle = () => {
        this.setState(state => ({ open: !this.state.open }));
    };


    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };


    handleSettingsChange = (event) => {
        switch (event.target.id) {
            case 'mostPopular':
                this.props.saveSettings(FeedSettings.MOST_POPULAR);
                this.queryFeed(FeedSettings.MOST_POPULAR);
                break;
            case 'mostViews':
                this.props.saveSettings(FeedSettings.MOST_VIEWS);
                this.queryFeed(FeedSettings.MOST_VIEWS);
                break;
            case 'mostUpvoted':
                this.props.saveSettings(FeedSettings.MOST_UPVOTED);
                this.queryFeed(FeedSettings.MOST_UPVOTED);
                break;
            case 'mostSaved':
                this.props.saveSettings(FeedSettings.MOST_SAVED);
                this.queryFeed(FeedSettings.MOST_SAVED);
                break;
        }
    };


    render() {
        let snippets = [];
        this.state.snippetIds.forEach(id => {
            if (this.props.snippets.byIds[id])
                snippets.push(this.props.snippets.byIds[id]);
        });

        const { open } = this.state;
        let currentSettings = localStorage.getItem('feedSettings');

        return (
            <div style={styles.rootCtn}>
                <div style={styles.contentCtn}>
                    <IconButton buttonRef={node => {this.anchorEl = node;}}
                                onClick={this.handleToggle} style={styles.settingsIcon}>
                        <Settings/>
                    </IconButton>

                    <SnippetsList style={styles.snippetsCtn} snippets={snippets}/>

                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                            <MenuItem disabled>Filter By</MenuItem>
                                            <MenuItem id="mostPopular"
                                                      onClick={this.handleSettingsChange}
                                                      selected={currentSettings === FeedSettings.MOST_POPULAR}
                                            >
                                                Most Popular
                                            </MenuItem>
                                            <MenuItem id="mostViews"
                                                      onClick={this.handleSettingsChange}
                                                      selected={currentSettings === FeedSettings.MOST_VIEWS}
                                            >
                                                Most Views
                                            </MenuItem>
                                            <MenuItem id="mostUpvoted"
                                                      onClick={this.handleSettingsChange}
                                                      selected={currentSettings === FeedSettings.MOST_UPVOTED}
                                            >
                                                Most Upvoted
                                            </MenuItem>
                                            <MenuItem id="mostSaved"
                                                      onClick={this.handleSettingsChange}
                                                      selected={currentSettings === FeedSettings.MOST_SAVED}
                                            >
                                                Most Saved
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        snippets: state.snippets,
        settings: state.settings
    };
}


export default withRouter(connect(mapStateToProps, {
    fetchPopularSnippets,
    fetchMostSavedSnippets,
    fetchMostViewsSnippets,
    fetchMostUpvotesSnippets,
    searchSnippets,
    saveSettings
})(HomePage));