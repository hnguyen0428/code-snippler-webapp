import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import history from '../../../root/history';
import {withStyles} from '@material-ui/core'

import Paginator from '../../dumb/Paginator/Paginator';
import SnippetsList from '../../dumb/SnippetsList/SnippetsList';

import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';

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

const moment = require('moment');


class ProfilePage extends Component {
    CREATED_SNIPPETS_INDEX = 0;
    SAVED_SNIPPETS_INDEX = 1;


    constructor(props) {
        super(props);

        this.state = {
            tabValue: this.CREATED_SNIPPETS_INDEX
        };
    }


    componentWillMount() {
        if (!this.props.auth.loggedIn) {
            history.push('/');
            return;
        }

        let userId = this.props.match.params.userId;
        if (userId === 'me')
            this.props.fetchMe();
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


    render() {
        if (!this.props.auth.loggedIn) {
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


            return (
                <div style={styles.rootCtn}>
                    <div style={styles.contentCtn}>
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

                        <SnippetsList style={styles.snippetsCtn} snippets={snippets}/>
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