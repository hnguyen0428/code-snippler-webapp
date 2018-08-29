import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import history from '../../../root/history';
import {withStyles} from '@material-ui/core'

import Paginator from '../../dumb/Paginator/Paginator';
import SnippetsList from '../../dumb/SnippetsList/SnippetsList';
import SearchBar from '../../dumb/SearchBar/SearchBar';
import SettingsDialog from '../../dumb/SettingsDialog/SettingsDialog';
import EditorSettingsDialog from '../../smart/EditorSettingsDialog/EditorSettingsDialog';

import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';

import Settings from '@material-ui/icons/Settings';

import {
    fetchMyCreatedSnippets,
    fetchMySavedSnippets,
    fetchUserCreatedSnippets,
    fetchUserSavedSnippets,
    fetchMe,
    fetchUser
} from '../../../redux/actions/userActions';

import {fetchSnippetsByIds} from "../../../redux/actions/snippetActions";

import {styles, materialStyles} from './styles';
import {theme} from '../../../constants/GlobalStyles';
import SnipplerConfig from '../../../constants/SnipplerConfig';

const moment = require('moment');


class ProfilePage extends Component {
    CREATED_SNIPPETS_INDEX = 0;
    SAVED_SNIPPETS_INDEX = 1;


    constructor(props) {
        super(props);

        this.state = {
            tabValue: this.CREATED_SNIPPETS_INDEX,
            searchQuery: '',
            page: 0,
            settingsDialogOpen: false,
            editorSettingsDialogOpen: false
        };
    }


    componentWillMount() {
        let userId = this.props.match.params.userId;
        if (userId === 'me') {
            if (!this.props.auth.loggedIn) {
                history.push('/');
                return;
            }

            this.props.fetchMe();
        }
        else
            this.props.fetchUser(userId);

        this.querySnippets(this.state.tabValue);
    }


    handleTabChange = (event, value) => {
        this.setState({
            tabValue: value
        });

        this.querySnippets(value);
    };


    querySnippets = (tabValue) => {
        let user = null;
        if (this.props.match.params.userId === 'me') {
            user = this.props.users.byIds[this.props.auth.currentUser.userId];
        }
        else {
            user = this.props.users.byIds[this.props.match.params.userId];
        }

        if (user === undefined || user === null)
            return;

        let toFetch = [];
        if (tabValue === this.CREATED_SNIPPETS_INDEX && user.createdSnippets) {
            user.createdSnippets.forEach(snippetId => {
                if (this.props.snippets.byIds[snippetId] === undefined)
                    toFetch.push(snippetId);
            });
        }
        else if (tabValue === this.SAVED_SNIPPETS_INDEX && user.savedSnippets) {
            user.savedSnippets.forEach(snippetId => {
                if (this.props.snippets.byIds[snippetId] === undefined)
                    toFetch.push(snippetId);
            });
        }

        if (toFetch.length !== 0)
            this.props.fetchSnippetsByIds(toFetch);
    };


    onSearchBarChange = (event) => {
        this.setState({searchQuery: event.target.value});
    };


    filterByQuery = (snippets, query) => {
        // Trim beginning and end white spaces
        query = query.replace(/^\s+/g, '');
        query = query.replace(/\s+$/g, '');

        query = query.split(' ');
        let regexStr = query.join('|');
        let regex = new RegExp(regexStr, 'i');

        let results = [];
        snippets.forEach(snippet => {
            if (regex.test(snippet.title))
                results.push(snippet);
            else if (snippet.description && regex.test(snippet.description))
                results.push(snippet);
        });

        return results;
    };


    paginate = (snippets, page, pageSize) => {
        let start = page * pageSize;
        let end = start + pageSize;
        if (end > snippets.length)
            return snippets.slice(start);
        else
            return snippets.slice(start, end);
    };


    onBackwardPaging = () => {
        this.setState({page: this.state.page - 1});
    };


    onForwardPaging = () => {
        this.setState({page: this.state.page + 1});
    };


    onClickSettings = () => {
        this.setState({settingsDialogOpen: true});
    };


    closeSettingsDialog = () => {
        this.setState({settingsDialogOpen: false});
    };

    onClickEditorSettings = () => {
        this.setState({editorSettingsDialogOpen: true});
    };

    onClickChangePassword = () => {

    };

    onClickProfileInfo = () => {

    };

    onClickBackDialog = (dialog) => {
        console.log(dialog.props.name);
        this.setState({editorSettingsDialogOpen: false});
    };

    onClickSaveDialog = (dialog) => {
        console.log(dialog.props.name);
        this.setState({editorSettingsDialogOpen: false});
    };


    render() {
        if (this.props.match.params.userId === 'me' && !this.props.auth.loggedIn) {
            return <div/>;
        }

        let isMe = this.props.match.params.userId === 'me';
        let user = null;
        if (isMe) {
            user = this.props.users.byIds[this.props.auth.currentUser.userId];
        }
        else {
            user = this.props.users.byIds[this.props.match.params.userId];
        }

        const {classes} = this.props;

        if (user) {
            this.querySnippets(this.state.tabValue);
            let date = new Date(user.createdDate);
            date = moment(date).format("MMMM, YYYY");

            let snippets = [];
            if (this.state.tabValue === this.CREATED_SNIPPETS_INDEX && user.createdSnippets) {
                user.createdSnippets.forEach(snippetId => {
                    if (this.props.snippets.byIds[snippetId])
                        snippets.push(this.props.snippets.byIds[snippetId]);
                });
            }
            else if (this.state.tabValue === this.SAVED_SNIPPETS_INDEX && user.savedSnippets) {
                user.savedSnippets.forEach(snippetId => {
                    if (this.props.snippets.byIds[snippetId])
                        snippets.push(this.props.snippets.byIds[snippetId]);
                });
            }

            let maxPage = 1;

            if (this.state.searchQuery !== '') {
                snippets = this.filterByQuery(snippets, this.state.searchQuery);
                maxPage = Math.ceil(snippets.length / SnipplerConfig.PROFILE_PAGE_SIZE);
                snippets = this.paginate(snippets, this.state.page, SnipplerConfig.PROFILE_PAGE_SIZE);
            }
            else {
                maxPage = Math.ceil(snippets.length / SnipplerConfig.PROFILE_PAGE_SIZE);
                snippets = this.paginate(snippets, this.state.page, SnipplerConfig.PROFILE_PAGE_SIZE);
            }

            return (
                <div style={styles.rootCtn}>
                    <SettingsDialog
                        open={this.state.settingsDialogOpen}
                        onBackdropClick={this.closeSettingsDialog}
                        onEscapeKeyDown={this.closeSettingsDialog}
                        onClickEditor={this.onClickEditorSettings}
                        onClickPassword={this.onClickChangePassword}
                        onClickProfile={this.onClickProfileInfo}
                    />

                    <EditorSettingsDialog
                        name="EditorSettingsDialog"
                        open={this.state.editorSettingsDialogOpen}
                        maxWidth="md"
                        onClickBack={this.onClickBackDialog}
                        onClickSave={this.onClickSaveDialog}
                    />

                    <div style={styles.contentCtn}>
                        <div style={styles.actionsCtn}>
                            <div style={styles.usernameCtn}>
                                <Toolbar>
                                    <Avatar style={styles.profileIcon}>
                                        {user.username.substr(0, 1).toUpperCase()}
                                    </Avatar>
                                    <InputLabel style={styles.username}>
                                        {user.username + '\n'}
                                        Joined in {date}
                                    </InputLabel>
                                </Toolbar>
                            </div>

                            <div style={{flex: '1'}}/>

                            { isMe &&
                            <IconButton onClick={this.onClickSettings}>
                                <Settings/>
                            </IconButton>
                            }
                        </div>

                        <hr style={theme.hrLine}/>

                        <Tabs
                            textColor="primary"
                            indicatorColor="primary"
                            onChange={this.handleTabChange}
                            value={this.state.tabValue}
                            fullWidth
                            centered
                            classes={{indicator: classes.indicator}}
                        >
                            <Tab label={isMe ? 'Snippets You Created' : 'Snippets They Created'}
                                 classes={{label: classes.tabLabel}}/>
                            <Tab label={isMe ? 'Snippets You Saved' : 'Snippets They Saved'}
                                 classes={{label: classes.tabLabel}}/>
                        </Tabs>

                        <SearchBar
                            color="black"
                            style={styles.searchBar}
                            onChange={this.onSearchBarChange}
                            value={this.state.searchQuery}
                        />
                        <hr style={theme.hrLine}/>

                        <SnippetsList style={styles.snippetsCtn} snippets={snippets}/>
                        <Paginator
                            page={this.state.page + 1}
                            maxPage={maxPage}
                            onLeftIconClick={this.onBackwardPaging}
                            onRightIconClick={this.onForwardPaging}
                        />
                    </div>
                </div>
            );
        }

        return <div/>;
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        users: state.users,
        snippets: state.snippets
    };
}


export default withRouter(connect(mapStateToProps, {
    fetchMyCreatedSnippets,
    fetchMySavedSnippets,
    fetchUserCreatedSnippets,
    fetchUserSavedSnippets,
    fetchMe,
    fetchUser,
    fetchSnippetsByIds
})(withStyles(materialStyles)(ProfilePage)));