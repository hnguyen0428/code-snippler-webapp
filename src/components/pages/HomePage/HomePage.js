import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Popper from '@material-ui/core/Popper';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Settings from '@material-ui/icons/Settings';

import Paginator from '../../dumb/Paginator/Paginator';

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

import SnipplerConfig from '../../../constants/SnipplerConfig';

import {styles} from './styles';


class HomePage extends Component {
    MOST_POPULAR_MENUITEM = "mostPopular";
    MOST_VIEWS_MENUITEM = "mostViews";
    MOST_UPVOTED_MENUITEM = "mostUpvoted";
    MOST_SAVED_MENUITEM = "mostSaved";


    constructor(props) {
        super(props);

        this.state = {
            snippetIds: [],
            paginationParams: {
                page: 0,
                pageSize: SnipplerConfig.FEED_PAGE_SIZE
            }
        };
    }

    componentWillMount() {
        this.queryFeed();
    }


    queryFeed = (settingsCode, params) => {
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

        settingsCode = settingsCode !== undefined && settingsCode !== null ?
            settingsCode :
            this.props.settings.feedSettings;

        params = params ? params : this.state.paginationParams;

        switch (settingsCode) {
            case FeedSettings.MOST_POPULAR:
                this.props.fetchPopularSnippets(params, setSnippetIds);
                return;
            case FeedSettings.MOST_VIEWS:
                this.props.fetchMostViewsSnippets(params, setSnippetIds);
                return;
            case FeedSettings.MOST_UPVOTED:
                this.props.fetchMostUpvotesSnippets(params, setSnippetIds);
                return;
            case FeedSettings.MOST_SAVED:
                this.props.fetchMostSavedSnippets(params, setSnippetIds);
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
            case this.MOST_POPULAR_MENUITEM:
                this.props.saveSettings(FeedSettings.MOST_POPULAR);
                this.queryFeed(FeedSettings.MOST_POPULAR);
                break;
            case this.MOST_VIEWS_MENUITEM:
                this.props.saveSettings(FeedSettings.MOST_VIEWS);
                this.queryFeed(FeedSettings.MOST_VIEWS);
                break;
            case this.MOST_UPVOTED_MENUITEM:
                this.props.saveSettings(FeedSettings.MOST_UPVOTED);
                this.queryFeed(FeedSettings.MOST_UPVOTED);
                break;
            case this.MOST_SAVED_MENUITEM:
                this.props.saveSettings(FeedSettings.MOST_SAVED);
                this.queryFeed(FeedSettings.MOST_SAVED);
                break;
        }
    };


    handleForwardPaging = () => {
        let paginationParams = {
            page: this.state.paginationParams.page + 1,
            pageSize: this.state.paginationParams.pageSize
        };

        this.setState({
            paginationParams: paginationParams
        });

        this.queryFeed(null, paginationParams);
    };


    handleBackwardPaging = () => {
        let paginationParams = {
            page: this.state.paginationParams.page - 1,
            pageSize: this.state.paginationParams.pageSize
        };

        this.setState({
            paginationParams: paginationParams
        });

        this.queryFeed(null, paginationParams);
    };


    render() {
        let snippets = [];
        this.state.snippetIds.forEach(id => {
            if (this.props.snippets.byIds[id])
                snippets.push(this.props.snippets.byIds[id]);
        });

        const { open } = this.state;
        let currentSettings = this.props.settings.feedSettings;

        return (
            <div style={styles.rootCtn}>
                {snippets.length !== 0 ?
                    <div style={styles.contentCtn}>
                        <IconButton buttonRef={node => {
                            this.anchorEl = node;
                        }}
                                    onClick={this.handleToggle} style={styles.settingsIcon}>
                            <Settings/>
                        </IconButton>

                        <SnippetsList style={styles.snippetsCtn} snippets={snippets}/>
                        <Paginator
                            page={this.state.paginationParams.page + 1}
                            onLeftIconClick={this.handleBackwardPaging}
                            onRightIconClick={this.handleForwardPaging}
                            leftDisabled={this.state.paginationParams.page === 0}
                            rightDisabled={this.state.snippetIds.length === 0}
                        />

                        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={this.handleClose}>
                                            <MenuList>
                                                <MenuItem disabled>Filter By</MenuItem>
                                                <MenuItem id={this.MOST_POPULAR_MENUITEM}
                                                          onClick={this.handleSettingsChange}
                                                          selected={currentSettings === FeedSettings.MOST_POPULAR}
                                                >
                                                    Most Popular
                                                </MenuItem>
                                                <MenuItem id={this.MOST_VIEWS_MENUITEM}
                                                          onClick={this.handleSettingsChange}
                                                          selected={currentSettings === FeedSettings.MOST_VIEWS}
                                                >
                                                    Most Views
                                                </MenuItem>
                                                <MenuItem id={this.MOST_UPVOTED_MENUITEM}
                                                          onClick={this.handleSettingsChange}
                                                          selected={currentSettings === FeedSettings.MOST_UPVOTED}
                                                >
                                                    Most Upvoted
                                                </MenuItem>
                                                <MenuItem id={this.MOST_SAVED_MENUITEM}
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
                :
                    <div style={styles.emptyContentCtn}>
                        <div style={styles.emptySnippetMessageCtn}>
                            <InputLabel style={styles.noSnippetMessage}>There are no snippets here</InputLabel>
                        </div>
                        <Paginator
                            page={this.state.paginationParams.page + 1}
                            onLeftIconClick={this.handleBackwardPaging}
                            onRightIconClick={this.handleForwardPaging}
                            leftDisabled={this.state.paginationParams.page === 0}
                            rightDisabled={this.state.snippetIds.length === 0}
                        />
                    </div>
                }
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